# n8n-nodes-abacus-ai

![RouteLLM](https://img.shields.io/badge/RouteLLM-Custom%20Node-blue)
![n8n](https://img.shields.io/badge/n8n-Community%20Node-FF6D5A)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This is an n8n community node that lets you use RouteLLM's powerful LLM services in your n8n workflows. RouteLLM provides access to multiple Large Language Models for AI operations.

## 📦 Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-abacus-ai` as the npm package name
4. Agree to the risks of using community nodes
5. Select **Install**

### Manual Installation

To get started install the package in your n8n root directory:

```bash
npm install n8n-nodes-abacus-ai
```

For Docker-based deployments, add the following line to your n8n Dockerfile:

```dockerfile
RUN npm install n8n-nodes-abacus-ai
```

### Development Installation

For development purposes:

```bash
# Clone the repository
git clone https://github.com/your-username/n8n-nodes-abacus-ai.git
cd n8n-nodes-abacus-ai

# Install dependencies
pnpm install

# Build the project
pnpm build

# Link to your n8n installation
pnpm link --global
cd /path/to/your/n8n
pnpm link --global n8n-nodes-abacus-ai
```

## 🔐 Credentials

Before using this node, you need to create credentials for RouteLLM:

1. Sign up for an account at [RouteLLM](https://routellm.abacus.ai)
2. Navigate to your API Keys Dashboard
3. Generate a new API key
4. In n8n, create new **RouteLLM API** credentials
5. Enter your API key and base URL (leave default for legacy operations)

## 🚀 Operations

This node supports multiple resources and operations:

### Chat LLM Resource

#### Send Prompt
- **Purpose**: Send a prompt to an LLM and get a response
- **Use Cases**: Content generation, text analysis, question answering
- **Models Supported**: RouteLLM, GPT-4o, GPT-4o-mini, O4-mini, O3-pro, O3, O3-mini, GPT-4.1 series, GPT-5 series, OpenAI GPT-OSS-120B, Claude 3.7 Sonnet, Claude Sonnet/Haiku 4 series, Meta Llama models, Gemini models, Qwen models, Grok models, and more

#### Chat Conversation
- **Purpose**: Continue a conversation with context from previous messages
- **Use Cases**: Chatbots, conversational AI, context-aware responses
- **Features**: Maintains conversation history, supports system messages

### Deployment Resource

#### Get Prediction
- **Purpose**: Get predictions from deployed models
- **Use Cases**: Real-time inference, model serving, custom ML predictions

#### List Deployments
- **Purpose**: Retrieve all available deployments
- **Use Cases**: Monitoring, deployment management

### Project Resource

#### List Projects
- **Purpose**: Get all projects in your organization
- **Use Cases**: Project management, workflow organization

#### Create Project
- **Purpose**: Create a new project with specified use case
- **Use Cases**: Project initialization, automated project setup

## 📋 Examples

### Basic Prompt Example

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "chatLLM",
        "operation": "sendPrompt",
        "prompt": "Write a professional email template for customer follow-up",
        "model": "gpt-5",
        "temperature": 0.7,
        "maxTokens": 500,
        "systemMessage": "You are a professional business communication expert."
      },
      "name": "Abacus.AI",
      "type": "n8n-nodes-abacus-ai.abacusAi"
    }
  ]
}
```

### Conversation with Context

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "chatLLM",
        "operation": "chatConversation",
        "prompt": "Can you elaborate on the second point?",
        "model": "claude-3-7-sonnet-20250219",
        "conversationHistory": "[{\"role\": \"user\", \"content\": \"List three benefits of automation\"}, {\"role\": \"assistant\", \"content\": \"1. Increased efficiency 2. Reduced errors 3. Cost savings\"}]",
        "temperature": 0.5
      },
      "name": "Abacus.AI Chat",
      "type": "n8n-nodes-abacus-ai.abacusAi"
    }
  ]
}
```

### Advanced Configuration

The node supports advanced parameters in the "Additional Fields" section:

- **Top P**: Controls diversity via nucleus sampling (0-1)
- **Frequency Penalty**: Reduces repetition (-2 to 2)
- **Presence Penalty**: Encourages topic diversity (-2 to 2)
- **Stream Response**: Enable streaming responses (boolean)

## 🔗 Integration Examples

### AI Content Pipeline

1. **Input**: Blog topic from webhook
2. **Abacus.AI**: Generate blog outline
3. **Abacus.AI**: Write detailed content for each section
4. **Set**: Combine sections into final blog post
5. **Output**: Save to CMS or send to review

### Customer Support Bot

1. **Trigger**: New support ticket
2. **Abacus.AI**: Analyze ticket sentiment and categorize
3. **IF**: Route based on category
4. **Abacus.AI**: Generate appropriate response
5. **Integration**: Send response via email/chat platform

### Data Analysis Workflow

1. **Input**: CSV data upload
2. **Code**: Process and format data
3. **Abacus.AI**: Generate insights and analysis
4. **Abacus.AI**: Create executive summary
5. **Output**: Generate report with visualizations

## 🛠️ Parameters

### Chat LLM Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Prompt | String | Yes | The text prompt to send to the LLM |
| Model | Options | Yes | LLM model to use (see full list above) |
| Temperature | Number | No | Controls randomness (0-2, default: 0.7) |
| Max Tokens | Number | No | Maximum response length (1-8000, default: 1000) |
| System Message | String | No | Sets the AI's behavior and context |
| Stream | Boolean | No | Whether to stream the response (default: false) |
| Conversation History | JSON | No | Previous messages for conversation context |

### Deployment Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Deployment ID | String | Yes | ID of the deployed model |
| Input Data | JSON | Yes | Data to send for prediction |

### Project Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Project Name | String | Yes | Name for the new project |
| Use Case | Options | Yes | Project type (Chat LLM, Forecasting, etc.) |

## 📊 Response Format

### Chat LLM Response

```json
{
  "response": "Generated text response from the LLM",
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 200,
    "total_tokens": 250
  },
  "model": "gpt-4-turbo",
  "messages": [...],
  "raw_response": {...}
}
```

### Deployment Response

```json
{
  "prediction": {...},
  "deploymentId": "abc123",
  "status": "success"
}
```

## 🔍 Error Handling

The node provides comprehensive error handling:

- **Authentication Errors**: Invalid API key or permissions
- **Parameter Errors**: Missing or invalid parameters
- **Rate Limits**: API rate limiting responses
- **Model Errors**: Model-specific errors and limitations

Error responses include:
- Error message and type
- Item index for batch processing
- Suggestions for resolution

## 🌟 Best Practices

1. **API Key Security**: Store API keys securely using n8n's credential system
2. **Rate Limiting**: Be mindful of API rate limits, especially for high-volume workflows
3. **Token Management**: Monitor token usage for cost optimization
4. **Error Handling**: Use "Continue on Fail" for robust workflows
5. **Model Selection**: Choose appropriate models based on task complexity and cost
6. **Prompt Engineering**: Use clear, specific prompts for better results

## 🔄 Version Compatibility

- **n8n version**: 0.180.0 or later
- **Node.js**: 18.10.0 or later
- **RouteLLM API**: v1 (chat completions), v0 (legacy operations)
- **Abacus.AI API**: v0 (current)

## 📝 License

[MIT](https://github.com/your-username/n8n-nodes-abacus-ai/blob/main/LICENSE.md)

## 🤝 Contributing

Contributions are welcome! Please read the [contribution guidelines](CONTRIBUTING.md) before submitting pull requests.

## 📞 Support

- **Documentation**: [RouteLLM Documentation](https://routellm.abacus.ai)
- **API Reference**: [RouteLLM API](https://routellm.abacus.ai)
- **Issues**: [GitHub Issues](https://github.com/your-username/n8n-nodes-abacus-ai/issues)
- **n8n Community**: [n8n Forum](https://community.n8n.io)

## 🚀 Changelog

### 1.1.0
- Updated to RouteLLM API
- Added streaming support
- Expanded model support with 50+ models including GPT-5 series, Claude 4 series, Gemini models, and more
- Changed authentication to Bearer token
- Updated documentation and examples

### 1.0.0
- Initial release
- Chat LLM operations (Send Prompt, Chat Conversation)
- Deployment operations (Get Prediction, List Deployments)
- Project operations (List Projects, Create Project)
- Support for multiple LLM models
- Comprehensive error handling
- Full credential management

---

Made with ❤️ for the n8n community 