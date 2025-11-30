# Implementation Plan - Field Survey & Visit Intelligence System

## Goal Description
Build a comprehensive system for field sales supervisors to verify client databases, record visits, and analyze planogram compliance using AI. The system includes a Mobile App for field work, a Web Dashboard for administration, a Backend for data management, and an AI service for image analysis.

## User Review Required
> [!IMPORTANT]
> **AI Planogram Implementation**: A full-blown AI model for product recognition is a complex task usually requiring custom training data. For this implementation, we will build the *infrastructure* and a *basic/mock* AI service that simulates the analysis (Share of Shelf, Missing SKUs) or uses a generic object detection model if feasible without custom training.

> [!NOTE]
> **Maps API**: Google Maps API keys are required for production use (Geocoding, Maps SDK). We will use placeholders or open-source alternatives (Leaflet/OSM) where possible for development if keys are not provided.

## Proposed Changes

### Architecture
- **Monorepo Structure**:
    - `backend`: Node.js (Express) + PostgreSQL (Prisma ORM)
    - `ai-service`: Python (FastAPI)
    - `web-dashboard`: React (Vite) + TailwindCSS
    - `mobile-app`: React Native (Expo) + SQLite (WatermelonDB or Expo SQLite)

### Backend (Node.js)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT (JSON Web Tokens)
- **Features**:
    - REST API for Mobile (Sync) and Web.
    - Role-based access (Admin, Supervisor).
    - Geo-spatial queries (PostGIS or Haversine formula) for "Near Me" features.

### AI Microservice (Python)
- **Framework**: FastAPI
- **Features**:
    - Receives image URLs/Files.
    - Processes images (Placeholder for Computer Vision logic).
    - Returns JSON report (Share of Shelf, Missing items).

### Web Dashboard (React)
- **Framework**: React (Vite)
- **Styling**: TailwindCSS
- **Features**:
    - Admin Login.
    - Map View (Leaflet/Google Maps) for Supervisor tracking.
    - Data Tables for Clients/Visits.
    - Analytics Charts (Recharts).

### Mobile App (React Native)
- **Framework**: Expo
- **Database**: Local SQLite (for offline support).
- **Sync**: Custom sync logic (push/pull) with Backend.
- **Features**:
    - GPS Tracking & Geofencing.
    - Camera integration.
    - Offline-first architecture.

## Verification Plan

### Automated Tests
- Backend: Jest tests for API endpoints.
- AI Service: Pytest for endpoint response.

### Manual Verification
- **Mobile**:
    - Test "Check-in" flow offline and sync when online.
    - Verify "Near Me" notifications (simulated location).
- **Web**:
    - Verify Admin can see live updates from Mobile actions.
    - Check Dashboard statistics accuracy.
