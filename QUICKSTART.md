# Quick Start Guide - Abacus.AI n8n Custom Node

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js 18.10+** - [Download here](https://nodejs.org/)
- **pnpm** - Install with: `npm install -g pnpm`
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **Abacus.AI Account** - [Sign up here](https://abacus.ai)

## 🚀 Quick Setup (Windows)

### Option 1: PowerShell Script (Recommended for Windows)

1. Open PowerShell as Administrator
2. Navigate to the project directory
3. Run the build script:

```powershell
.\scripts\build-and-deploy.ps1
```

### Option 2: Manual Setup

If you prefer to set everything up manually:

```powershell
# Install dependencies
pnpm install

# Build the project
pnpm build

# Start n8n with Docker
docker-compose up -d

# Check if n8n is running
docker-compose ps
```

## 🚀 Quick Setup (Linux/macOS)

### Option 1: Bash Script

```bash
# Make script executable
chmod +x scripts/build-and-deploy.sh

# Run the build script
./scripts/build-and-deploy.sh
```

### Option 2: Manual Setup

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Start n8n with Docker
docker-compose up -d
```

## 🔐 Setting Up Abacus.AI Credentials

1. **Get your API Key**:
   - Go to [Abacus.AI API Keys Dashboard](https://abacus.ai/app/profile/apikey)
   - Click "Generate new API Key"
   - Copy the generated key

2. **Configure in n8n**:
   - Open n8n at [http://localhost:5678](http://localhost:5678)
   - Login with `admin` / `admin123`
   - Go to **Settings > Credentials**
   - Click **Add Credential**
   - Select **Abacus.AI API**
   - Enter your API Key
   - Leave Base URL as default: `https://api.abacus.ai`
   - Test and save the credentials

## 🧪 Testing Your Setup

### 1. Create a Simple Workflow

1. **Create New Workflow**:
   - Click **"New Workflow"** in n8n
   - Add a **Manual Trigger** node

2. **Add Abacus.AI Node**:
   - Click the **"+"** button
   - Search for **"Abacus.AI"**
   - Select the node and add it to your workflow

3. **Configure the Node**:
   - **Resource**: Chat LLM
   - **Operation**: Send Prompt
   - **Credentials**: Select your Abacus.AI credentials
   - **Prompt**: `"Write a short poem about automation"`
   - **Model**: GPT-4 Turbo
   - **Temperature**: 0.7

4. **Execute the Workflow**:
   - Click **"Execute Workflow"**
   - Click on the Abacus.AI node to see the results

### 2. Example Prompts to Try

#### Content Generation
```
Prompt: "Write a professional email template for a product launch announcement"
System Message: "You are a marketing professional with 10 years of experience"
```

#### Data Analysis
```
Prompt: "Analyze this sales data and provide key insights: [paste your data]"
System Message: "You are a data analyst expert"
```

#### Code Generation
```
Prompt: "Create a Python function that calculates the moving average of a list"
System Message: "You are a senior software engineer"
```

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm build` | Build the TypeScript code |
| `pnpm dev` | Build in watch mode |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |

## 🐳 Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start n8n in background |
| `docker-compose down` | Stop n8n |
| `docker-compose restart n8n` | Restart n8n to reload changes |
| `docker-compose logs n8n` | View n8n logs |

## 📁 Project Structure

```
n8n-nodes-abacus-ai/
├── credentials/
│   └── AbacusAiApi.credentials.ts    # API credentials configuration
├── nodes/
│   └── AbacusAi/
│       ├── AbacusAi.node.ts          # Main node implementation
│       └── abacusai.svg              # Node icon
├── scripts/
│   ├── build-and-deploy.sh           # Build script (Linux/macOS)
│   └── build-and-deploy.ps1          # Build script (Windows)
├── docker-compose.yml                # Docker configuration
├── package.json                      # Node.js dependencies
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Full documentation
```

## 🆘 Troubleshooting

### Common Issues

#### 1. "Cannot find module 'n8n-workflow'"
**Solution**: The node hasn't been built yet
```powershell
pnpm build
```

#### 2. "Docker is not running"
**Solution**: Start Docker Desktop and wait for it to be ready

#### 3. "n8n node not appearing"
**Solution**: Restart the n8n container
```powershell
docker-compose restart n8n
```

#### 4. "API Key authentication failed"
**Solution**: 
- Verify your API key is correct
- Check if you have the right permissions
- Ensure the base URL is correct

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/your-username/n8n-nodes-abacus-ai/issues)
- **Documentation**: [Abacus.AI Help](https://abacus.ai/help)
- **n8n Community**: [n8n Forum](https://community.n8n.io)

## 🎉 Success!

If everything is working correctly, you should see:
- ✅ n8n running at [http://localhost:5678](http://localhost:5678)
- ✅ Abacus.AI node available in the node palette
- ✅ Successful API calls to Abacus.AI
- ✅ LLM responses in your workflow outputs

Now you're ready to build amazing AI-powered workflows with Abacus.AI and n8n! 🚀 