# Build and Deploy Script for Abacus.AI n8n Custom Node (PowerShell)
param(
    [switch]$Force
)

Write-Host "🚀 Building Abacus.AI n8n Custom Node..." -ForegroundColor Green

# Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    pnpm install
}

# Build the project
Write-Host "🔨 Building TypeScript..." -ForegroundColor Yellow
pnpm build

# Check if Docker Desktop is running
try {
    $dockerInfo = docker info 2>$null
    if (-not $dockerInfo) {
        throw "Docker not running"
    }
} catch {
    Write-Host "❌ Docker Desktop is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Docker Compose services are running
try {
    $services = docker-compose ps --services --filter "status=running" 2>$null
    if ($services -contains "n8n") {
        Write-Host "🔄 Restarting n8n container to load new node..." -ForegroundColor Yellow
        docker-compose restart n8n
        
        # Wait for n8n to be ready again
        Write-Host "⏳ Waiting for n8n to restart..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        
        $maxAttempts = 30
        $attempt = 0
        do {
            $attempt++
            try {
                $response = Invoke-WebRequest -Uri "http://localhost:5678" -TimeoutSec 2 -ErrorAction Stop
                break
            } catch {
                Start-Sleep -Seconds 2
            }
        } while ($attempt -lt $maxAttempts)
        
        if ($attempt -eq $maxAttempts) {
            Write-Host "❌ n8n failed to start within expected time" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "🐳 Starting Docker Compose..." -ForegroundColor Yellow
        docker-compose up -d
        
        # Wait for n8n to be ready
        Write-Host "⏳ Waiting for n8n to start..." -ForegroundColor Yellow
        $maxAttempts = 60
        $attempt = 0
        do {
            $attempt++
            try {
                $response = Invoke-WebRequest -Uri "http://localhost:5678" -TimeoutSec 2 -ErrorAction Stop
                break
            } catch {
                Start-Sleep -Seconds 2
            }
        } while ($attempt -lt $maxAttempts)
        
        if ($attempt -eq $maxAttempts) {
            Write-Host "❌ n8n failed to start within expected time" -ForegroundColor Red
            exit 1
        }
        
        Write-Host "✅ n8n is ready!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error with Docker Compose: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Abacus.AI node has been built and deployed!" -ForegroundColor Green
Write-Host "🌐 Access n8n at: http://localhost:5678" -ForegroundColor Cyan
Write-Host "👤 Username: admin" -ForegroundColor White
Write-Host "🔑 Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "📋 To test the node:" -ForegroundColor Yellow
Write-Host "1. Create a new workflow" -ForegroundColor White
Write-Host "2. Add an 'Abacus.AI' node" -ForegroundColor White
Write-Host "3. Configure your Abacus.AI credentials" -ForegroundColor White
Write-Host "4. Set up a prompt and run the workflow" -ForegroundColor White 