#!/bin/bash

# Build and Deploy Script for Abacus.AI n8n Custom Node
set -e

echo "🚀 Building Abacus.AI n8n Custom Node..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Build the project
echo "🔨 Building TypeScript..."
pnpm build

# Check if Docker Compose is running
if ! docker-compose ps | grep -q "n8n_abacus_dev.*Up"; then
    echo "🐳 Starting Docker Compose..."
    docker-compose up -d
    
    # Wait for n8n to be ready
    echo "⏳ Waiting for n8n to start..."
    while ! curl -s http://localhost:5678 > /dev/null; do
        sleep 2
    done
    echo "✅ n8n is ready!"
else
    echo "🔄 Restarting n8n container to load new node..."
    docker-compose restart n8n
    
    # Wait for n8n to be ready again
    echo "⏳ Waiting for n8n to restart..."
    sleep 5
    while ! curl -s http://localhost:5678 > /dev/null; do
        sleep 2
    done
fi

echo "✅ Abacus.AI node has been built and deployed!"
echo "🌐 Access n8n at: http://localhost:5678"
echo "👤 Username: admin"
echo "🔑 Password: admin123"
echo ""
echo "📋 To test the node:"
echo "1. Create a new workflow"
echo "2. Add an 'Abacus.AI' node"
echo "3. Configure your Abacus.AI credentials"
echo "4. Set up a prompt and run the workflow" 