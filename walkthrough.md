# Walkthrough - Field Survey & Visit Intelligence System

## Overview
We have successfully built the complete source code for the Field Survey System. The system consists of four main components: Backend, AI Service, Web Dashboard, and Mobile App.

## 1. Backend (Node.js + Express + Prisma)
- **Authentication**: JWT-based auth with `authMiddleware`.
- **Database**: PostgreSQL schema with `User`, `Client`, `Visit`, `Product`, `Planogram` models.
- **API Endpoints**:
    - `/api/auth`: Login and Register.
    - `/api/clients`: CRUD operations for Clients.
    - `/api/visits`: Record visits and fetch history.
- **AI Integration**: The `recordVisit` controller asynchronously calls the AI Service when photos are present to update the visit with Planogram analysis results.

## 2. AI Microservice (Python + FastAPI)
- **Endpoint**: `/analyze` accepts an image and returns a JSON report.
- **Logic**: 
    - Validates image content type.
    - Simulates processing delay (1.5s).
    - Returns mock data for `share_of_shelf`, `missing_skus`, and `compliance_score`.

## 3. Web Dashboard (React + Vite)
- **Pages**:
    - **Login**: Admin/Supervisor login.
    - **Dashboard**: Live map tracking (Leaflet) and KPI cards.
    - **Clients**: Data table for managing clients.
- **Features**: Protected routes, responsive layout.

## 4. Mobile App (React Native + Expo)
- **Screens**:
    - **Login**: User authentication.
    - **Home**: List of clients and "Near Me" functionality (simulated).
    - **Visit**: Form to record visit status, notes, and capture photos.
- **Offline Support**: SQLite database (`db.js`) for local storage.

## How to Run

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- PostgreSQL Database
- Expo Go (for mobile testing)

### Steps
1. **Backend**:
   ```bash
   cd backend
   npm install
   # Setup .env with DATABASE_URL
   npx prisma db push
   npm run dev
   ```

2. **AI Service**:
   ```bash
   cd ai-service
   pip install -r requirements.txt
   python main.py
   ```

3. **Web Dashboard**:
   ```bash
   cd web-dashboard
   npm install
   npm run dev
   ```

4. **Mobile App**:
   ```bash
   cd mobile-app
   npm install
   npx expo start
   ```
