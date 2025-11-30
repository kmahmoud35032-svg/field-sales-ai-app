import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Record a new visit
export const recordVisit = async (req: any, res: Response) => {
    const userId = req.user.id;
    const { clientId, status, latitude, longitude, notes, photos, shareOfShelf, missingSkus, complianceScore } = req.body;

    try {
        const visit = await prisma.visit.create({
            data: {
                userId,
                clientId,
                status,
                latitude,
                longitude,
                notes,
                shareOfShelf,
                missingSkus,
                complianceScore,
                photos: {
                    create: photos // Assuming photos is an array of objects { url, type }
                }
            }
        });
        res.status(201).json(visit);
    } catch (error) {
        res.status(500).json({ message: 'Error recording visit', error });
    }
};

export const getVisits = async (req: any, res: Response) => {
    const user = req.user;
    try {
        const whereClause: any = {};

        if (user.role === 'SUPERVISOR') {
            whereClause.userId = user.id;
        }

        const visits = await prisma.visit.findMany({
            where: whereClause,
            include: {
                client: true,
                user: {
                    select: { name: true }
                },
                photos: true
            },
            orderBy: { date: 'desc' }
        });

        res.json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching visits', error });
    }
};
