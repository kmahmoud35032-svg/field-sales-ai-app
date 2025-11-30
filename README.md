# Field Survey & Visit Intelligence System

## Project Structure

- **backend**: Node.js + Express + Prisma (PostgreSQL)
- **ai-service**: Python + FastAPI
- **web-dashboard**: React + Vite + TailwindCSS
- **mobile-app**: React Native + Expo

## Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- PostgreSQL
- Docker (Optional)

## Setup Instructions

### Backend
1. Navigate to `backend`
2. Run `npm install`
3. Create `.env` file with `DATABASE_URL`
4. Run `npx prisma db push`
5. Run `npm run dev`

### AI Service
1. Navigate to `ai-service`
2. Run `pip install -r requirements.txt`
3. Run `python main.py`

### Web Dashboard
1. Navigate to `web-dashboard`
2. Run `npm install`
3. Run `npm run dev`

### Mobile App
1. Navigate to `mobile-app`
2. Run `npm install`
3. Run `npx expo start`

## Note on Environment
This code was generated in an environment without Node.js or Python installed. Please ensure you have the prerequisites installed to run the application.
