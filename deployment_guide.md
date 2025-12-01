# Deployment Guide

## Architecture Overview
The system consists of 3 services and a database:
1. **Backend** (Node.js)
2. **AI Service** (Python)
3. **Web Dashboard** (Static React Build)
4. **PostgreSQL** (Database)

## Docker Deployment (Recommended)

### 1. Create `docker-compose.yml`
Create a file in the root directory:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: fieldsurvey
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:password@postgres:5432/fieldsurvey
      JWT_SECRET: production_secret_key
    depends_on:
      - postgres

  ai-service:
    build: ./ai-service
    ports:
      - "8000:8000"

  web-dashboard:
    build: ./web-dashboard
    ports:
      - "80:80"

volumes:
  pgdata:
```

### 2. Dockerfiles

**Backend (`backend/Dockerfile`)**:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"]
```

**AI Service (`ai-service/Dockerfile`)**:
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Web Dashboard (`web-dashboard/Dockerfile`)**:
```dockerfile
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3. Run
```bash
docker-compose up --build -d
```

## Manual Deployment

### Database
1. Provision a PostgreSQL instance (AWS RDS, DigitalOcean, or local).
2. Get the connection string.

### Backend
1. Set `DATABASE_URL` env variable.
2. Run `npm install && npm run build`.
3. Run `npx prisma migrate deploy`.
4. Start with `node dist/index.js` (use PM2 for process management).

### AI Service
1. Install Python 3.9+.
2. Run `pip install -r requirements.txt`.
3. Start with `uvicorn main:app --host 0.0.0.0 --port 8000` (use Gunicorn for production).

### Web Dashboard
1. Run `npm run build`.
2. Serve the `dist` folder using Nginx, Apache, or Vercel/Netlify.

### Mobile App
1. Configure `app.json` with production API URLs.
2. Run `eas build` (Expo Application Services) to generate APK/IPA files.
