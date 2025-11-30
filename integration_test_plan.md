# System Integration Test Plan

## 1. Environment Setup
- [ ] Ensure PostgreSQL is running.
- [ ] Start Backend (`npm run dev`).
- [ ] Start AI Service (`python main.py`).
- [ ] Start Web Dashboard (`npm run dev`).
- [ ] Start Mobile App (`npx expo start`).

## 2. Authentication Flow
- [ ] **Register Admin**: Send POST to `/api/auth/register` with `role: "ADMIN"`. Verify 201 response.
- [ ] **Login Admin**: Send POST to `/api/auth/login`. Verify token received.
- [ ] **Register Supervisor**: Create a user with `role: "SUPERVISOR"`.

## 3. Client Management (Web/Backend)
- [ ] **Create Client**: As Admin, create a client "Test Grocery". Verify it appears in DB.
- [ ] **List Clients**: As Supervisor, fetch clients. Verify "Test Grocery" is listed.

## 4. Mobile App Workflow
- [ ] **Login**: Login as Supervisor on Mobile App.
- [ ] **Sync/Load**: Verify "Test Grocery" appears in the list.
- [ ] **Visit**:
    - Select "Test Grocery".
    - Click "Record Visit".
    - Status: "COMPLETED".
    - Take/Select a photo.
    - Submit.
- [ ] **Verify**: Check App shows "Visit recorded".

## 5. AI Analysis & Reporting
- [ ] **Check Backend Logs**: Verify `recordVisit` called `analyzeVisitPhotos`.
- [ ] **Check AI Logs**: Verify `/analyze` endpoint received request.
- [ ] **Wait**: Wait 2-3 seconds for async update.
- [ ] **Verify Database**: Check `Visit` table has `shareOfShelf` and `complianceScore` values updated.

## 6. Dashboard Visualization
- [ ] **Refresh Dashboard**: Open Web Dashboard.
- [ ] **Check Stats**: Verify "Total Visits" count increased.
- [ ] **Check Map**: Verify a marker appears at the visit location.
