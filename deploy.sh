#!/bin/bash

# Field Survey System - Deployment Script
# Usage: ./deploy.sh

echo "🚀 Starting Deployment Process..."

# 1. Check for Docker
if ! command -v docker &> /dev/null
then
    echo "❌ Docker could not be found. Please install Docker first."
    exit 1
fi

# 2. Build and Start Services
echo "📦 Building Docker Images..."
docker-compose build

echo "🔥 Starting Services..."
docker-compose up -d

# 3. Verify Deployment
echo "✅ Checking Service Health..."
sleep 5

if curl -s http://localhost:3000 > /dev/null; then
    echo "   - Backend: UP (Port 3000)"
else
    echo "   - Backend: DOWN"
fi

if curl -s http://localhost:8000 > /dev/null; then
    echo "   - AI Service: UP (Port 8000)"
else
    echo "   - AI Service: DOWN"
fi

echo "🎉 Deployment Complete!"
echo "   - Web Dashboard: http://localhost:8080"
echo "   - API: http://localhost:3000"
echo "   - AI Service: http://localhost:8000"
