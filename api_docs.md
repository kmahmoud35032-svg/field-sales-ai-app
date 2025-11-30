# Field Survey System - API Documentation

## Base URL
`http://localhost:3000/api`

## Authentication

### Register
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "SUPERVISOR", // or ADMIN
    "region": "Riyadh" // Optional
  }
  ```
- **Response**: `201 Created`

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "token": "jwt_token_here",
    "user": { "id": 1, "name": "John Doe", "role": "SUPERVISOR" }
  }
  ```

---

## Clients

### Get Clients
- **URL**: `/clients`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`
  ```json
  [
    {
      "id": 1,
      "name": "Al-Amal Grocery",
      "type": "GROCERY",
      "address": "Riyadh",
      "latitude": 24.71,
      "longitude": 46.67
    }
  ]
  ```

### Create Client
- **URL**: `/clients`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>` (Admin only)
- **Body**:
  ```json
  {
    "name": "New Supermarket",
    "phone": "0501234567",
    "address": "Jeddah",
    "latitude": 21.54,
    "longitude": 39.17,
    "type": "SUPERMARKET",
    "region": "Jeddah"
  }
  ```
- **Response**: `201 Created`

---

## Visits

### Record Visit
- **URL**: `/visits`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "clientId": 1,
    "status": "COMPLETED",
    "latitude": 24.71,
    "longitude": 46.67,
    "notes": "All good",
    "photos": ["http://url-to-photo.com/image.jpg"]
  }
  ```
- **Response**: `201 Created`
  - *Note*: If photos are provided, AI analysis is triggered asynchronously.

### Get Visits History
- **URL**: `/visits`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`
  ```json
  [
    {
      "id": 1,
      "date": "2023-11-30T10:00:00Z",
      "client": { "name": "Al-Amal Grocery" },
      "shareOfShelf": 0.85,
      "missingSkus": 3
    }
  ]
  ```
