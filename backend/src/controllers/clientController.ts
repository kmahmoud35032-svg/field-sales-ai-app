import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all clients (filtered by region if user is supervisor)
export const getClients = async (req: any, res: Response) => {
    const user = req.user;

    try {
        const whereClause: any = { isDeleted: false };

        if (user.role === 'SUPERVISOR' && user.region) {
            whereClause.region = user.region;
        }

        const clients = await prisma.client.findMany({
            where: whereClause,
            orderBy: { name: 'asc' }
        });

        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching clients', error });
    }
};

// Create a new client
export const createClient = async (req: Request, res: Response) => {
    const { name, phone, address, latitude, longitude, type, region } = req.body;

    try {
        const client = await prisma.client.create({
            data: {
                name,
                phone,
                address,
                latitude,
                longitude,
                type,
                region
            }
        });

        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error creating client', error });
    }
};

// Update client details
export const updateClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const client = await prisma.client.update({
            where: { id: Number(id) },
            data
        });

        res.json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error updating client', error });
    }
};
