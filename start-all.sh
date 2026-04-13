#!/bin/bash

# Webmart Complete Docker Startup Script
echo "🚀 Starting Webmart - Complete Project"
echo "======================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "🐳 Building and starting Webmart application..."
docker-compose up -d --build

echo "⏳ Waiting for database to be ready..."
sleep 10

echo "⏳ Waiting for backend to be ready..."
sleep 15

echo "⏳ Waiting for frontend to be ready..."
sleep 10

echo "🌱 Seeding database with initial data..."
docker-compose --profile seed run --rm seed-db

echo "⏳ Final health checks..."
sleep 5

echo ""
echo "🎉 Webmart is now running!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "🗄️ Database: PostgreSQL (localhost:5432)"
echo ""
echo "Useful commands:"
echo "  docker-compose logs -f backend       # View backend logs"
echo "  docker-compose logs -f frontend      # View frontend logs"
echo "  docker-compose logs -f db           # View database logs"
echo "  docker-compose down                 # Stop everything"
echo "  docker-compose restart              # Restart all services"
echo "  docker-compose --profile seed run --rm seed-db  # Re-seed database"
echo ""
echo "💡 Application features:"
echo "   - Interactive marketing quiz"
echo "   - Complete services catalog (35+ services)"
echo "   - Contact forms and chat widget"
echo "   - Responsive design"
echo "   - PostgreSQL database with persistent data"
echo ""
echo "💡 Backend API endpoints:"
echo "   GET  /health                        # Health check"
echo "   GET  /services/categories           # Service categories"
echo "   GET  /services/categories/:slug     # Services by category"
echo "   GET  /services/:slug                # Service details"
echo "   POST /quiz-submissions              # Quiz submissions"
echo "   POST /contact-requests              # Contact forms"
echo "   POST /chat-requests                 # Chat messages"

