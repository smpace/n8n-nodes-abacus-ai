import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class AbacusAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'RouteLLM',
		name: 'abacusAi',
		icon: 'file:abacusai.svg',
		group: ['ai'],
		version: 1,
		description: 'Interact with RouteLLM AI services for LLM operations',
		defaults: {
			name: 'RouteLLM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'abacusAiApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat LLM',
						value: 'chatLLM',
						description: 'Interact with Chat LLM services',
					},
					{
						name: 'Deployment',
						value: 'deployment',
						description: 'Manage deployments and predictions',
					},
					{
						name: 'Project',
						value: 'project',
						description: 'Manage projects',
					},
				],
				default: 'chatLLM',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chatLLM'],
					},
				},
				options: [
					{
						name: 'Send Prompt',
						value: 'sendPrompt',
						description: 'Send a prompt to the LLM and get a response',
					},
					{
						name: 'Chat Conversation',
						value: 'chatConversation',
						description: 'Continue a conversation with context',
					},
				],
				default: 'sendPrompt',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['deployment'],
					},
				},
				options: [
					{
						name: 'Get Prediction',
						value: 'getPrediction',
						description: 'Get prediction from a deployed model',
					},
					{
						name: 'List Deployments',
						value: 'listDeployments',
						description: 'List all deployments',
					},
				],
				default: 'getPrediction',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['project'],
					},
				},
				options: [
					{
						name: 'List Projects',
						value: 'listProjects',
						description: 'List all projects',
					},
					{
						name: 'Create Project',
						value: 'createProject',
						description: 'Create a new project',
					},
				],
				default: 'listProjects',
			},
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				displayOptions: {
					show: {
						resource: ['chatLLM'],
						operation: ['sendPrompt', 'chatConversation'],
					},
				},
				default: '',
				placeholder: 'Enter your prompt here...',
				description: 'The prompt to send to the LLM',
				required: true,
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['chatLLM'],
						operation: ['sendPrompt', 'chatConversation'],
					},
				},
				options: [
					{
						name: 'route-llm ($3.00/M Input, $15.00/M Output)',
						value: 'route-llm',
					},
					{
						name: 'gpt-4o-2024-11-20 ($2.50/M Input, $10.00/M Output)',
						value: 'gpt-4o-2024-11-20',
					},
					{
						name: 'gpt-4o-mini ($0.15/M Input, $0.60/M Output)',
						value: 'gpt-4o-mini',
					},
					{
						name: 'o4-mini ($1.10/M Input, $4.40/M Output)',
						value: 'o4-mini',
					},
					{
						name: 'o3-pro ($20.00/M Input, $40.00/M Output)',
						value: 'o3-pro',
					},
					{
						name: 'o3 ($2.00/M Input, $8.00/M Output)',
						value: 'o3',
					},
					{
						name: 'o3-mini ($1.10/M Input, $4.40/M Output)',
						value: 'o3-mini',
					},
					{
						name: 'gpt-4.1 ($2.00/M Input, $8.00/M Output)',
						value: 'gpt-4.1',
					},
					{
						name: 'gpt-4.1-mini ($0.40/M Input, $1.60/M Output)',
						value: 'gpt-4.1-mini',
					},
					{
						name: 'gpt-4.1-nano ($0.10/M Input, $0.40/M Output)',
						value: 'gpt-4.1-nano',
					},
					{
						name: 'gpt-5 ($1.25/M Input, $10.00/M Output)',
						value: 'gpt-5',
					},
					{
						name: 'gpt-5-mini ($0.25/M Input, $2.00/M Output)',
						value: 'gpt-5-mini',
					},
					{
						name: 'gpt-5-nano ($0.05/M Input, $0.40/M Output)',
						value: 'gpt-5-nano',
					},
					{
						name: 'gpt-5.1 ($1.25/M Input, $10.00/M Output)',
						value: 'gpt-5.1',
					},
					{
						name: 'gpt-5.1-chat-latest ($1.25/M Input, $10.00/M Output)',
						value: 'gpt-5.1-chat-latest',
					},
					{
						name: 'openai/gpt-oss-120b ($0.08/M Input, $0.44/M Output)',
						value: 'openai/gpt-oss-120b',
					},
					{
						name: 'claude-3-7-sonnet-20250219 ($3.00/M Input, $15.00/M Output)',
						value: 'claude-3-7-sonnet-20250219',
					},
					{
						name: 'claude-sonnet-4-20250514 ($3.00/M Input, $15.00/M Output)',
						value: 'claude-sonnet-4-20250514',
					},
					{
						name: 'claude-opus-4-20250514 ($15.00/M Input, $75.00/M Output)',
						value: 'claude-opus-4-20250514',
					},
					{
						name: 'claude-opus-4-1-20250805 ($15.00/M Input, $75.00/M Output)',
						value: 'claude-opus-4-1-20250805',
					},
					{
						name: 'claude-sonnet-4-5-20250929 ($3.00/M Input, $15.00/M Output)',
						value: 'claude-sonnet-4-5-20250929',
					},
					{
						name: 'claude-haiku-4-5-20251001 ($1.00/M Input, $5.00/M Output)',
						value: 'claude-haiku-4-5-20251001',
					},
					{
						name: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8 ($0.14/M Input, $0.59/M Output)',
						value: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8',
					},
					{
						name: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo ($3.50/M Input, $3.50/M Output)',
						value: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
					},
					{
						name: 'meta-llama/Meta-Llama-3.1-70B-Instruct ($0.40/M Input, $0.40/M Output)',
						value: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
					},
					{
						name: 'meta-llama/Meta-Llama-3.1-8B-Instruct ($0.02/M Input, $0.05/M Output)',
						value: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
					},
					{
						name: 'llama-3.3-70b-versatile ($0.59/M Input, $0.79/M Output)',
						value: 'llama-3.3-70b-versatile',
					},
					{
						name: 'gemini-2.0-flash-001 ($0.10/M Input, $0.40/M Output)',
						value: 'gemini-2.0-flash-001',
					},
					{
						name: 'gemini-2.0-pro-exp-02-05 ($N/A Input, $N/A Output)',
						value: 'gemini-2.0-pro-exp-02-05',
					},
					{
						name: 'gemini-2.5-pro ($1.25/M Input, $10.00/M Output)',
						value: 'gemini-2.5-pro',
					},
					{
						name: 'gemini-2.5-flash ($0.30/M Input, $2.50/M Output)',
						value: 'gemini-2.5-flash',
					},
					{
						name: 'gemini-3-pro-preview ($2.00/M Input, $12.00/M Output)',
						value: 'gemini-3-pro-preview',
					},
					{
						name: 'qwen-2.5-coder-32b ($0.79/M Input, $0.79/M Output)',
						value: 'qwen-2.5-coder-32b',
					},
					{
						name: 'Qwen/Qwen2.5-72B-Instruct ($0.11/M Input, $0.38/M Output)',
						value: 'Qwen/Qwen2.5-72B-Instruct',
					},
					{
						name: 'Qwen/QwQ-32B ($0.40/M Input, $0.40/M Output)',
						value: 'Qwen/QwQ-32B',
					},
					{
						name: 'Qwen/Qwen3-235B-A22B-Instruct-2507 ($0.13/M Input, $0.60/M Output)',
						value: 'Qwen/Qwen3-235B-A22B-Instruct-2507',
					},
					{
						name: 'Qwen/Qwen3-32B ($0.09/M Input, $0.29/M Output)',
						value: 'Qwen/Qwen3-32B',
					},
					{
						name: 'qwen/qwen3-coder-480b-a35b-instruct ($0.29/M Input, $1.20/M Output)',
						value: 'qwen/qwen3-coder-480b-a35b-instruct',
					},
					{
						name: 'qwen/qwen3-Max ($1.20/M Input, $6.00/M Output)',
						value: 'qwen/qwen3-Max',
					},
					{
						name: 'grok-4-0709 ($3.00/M Input, $15.00/M Output)',
						value: 'grok-4-0709',
					},
					{
						name: 'grok-4-fast-non-reasoning ($0.20/M Input, $0.50/M Output)',
						value: 'grok-4-fast-non-reasoning',
					},
					{
						name: 'grok-4-1-fast-non-reasoning ($0.20/M Input, $0.50/M Output)',
						value: 'grok-4-1-fast-non-reasoning',
					},
					{
						name: 'grok-code-fast-1 ($0.20/M Input, $1.50/M Output)',
						value: 'grok-code-fast-1',
					},
					{
						name: 'kimi-k2-turbo-preview ($0.15/M Input, $8.00/M Output)',
						value: 'kimi-k2-turbo-preview',
					},
					{
						name: 'deepseek/deepseek-v3.1 ($0.55/M Input, $1.66/M Output)',
						value: 'deepseek/deepseek-v3.1',
					},
					{
						name: 'deepseek-ai/DeepSeek-V3.1-Terminus ($0.27/M Input, $1.00/M Output)',
						value: 'deepseek-ai/DeepSeek-V3.1-Terminus',
					},
					{
						name: 'deepseek-ai/DeepSeek-R1 ($3.00/M Input, $7.00/M Output)',
						value: 'deepseek-ai/DeepSeek-R1',
					},
					{
						name: 'deepseek-ai/DeepSeek-V3.2-Exp ($0.27/M Input, $0.40/M Output)',
						value: 'deepseek-ai/DeepSeek-V3.2-Exp',
					},
					{
						name: 'zai-org/glm-4.5 ($0.60/M Input, $2.20/M Output)',
						value: 'zai-org/glm-4.5',
					},
					{
						name: 'zai-org/glm-4.6 ($0.60/M Input, $2.20/M Output)',
						value: 'zai-org/glm-4.6',
					},
				],
				default: 'gpt-5',
				description: 'The LLM model to use',
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 2,
					numberPrecision: 2,
				},
				displayOptions: {
					show: {
						resource: ['chatLLM'],
						operation: ['sendPrompt', 'chatConversation'],
					},
				},
				default: 0.7,
				description: 'Controls randomness in the output. Higher values make output more random.',
			},
			{
				displayName: 'Max Tokens',
				name: 'maxTokens',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 8000,
				},
				displayOptions: {
					show: {
						resource: ['chatLLM'],
						operation: ['sendPrompt', 'chatConversation'],
					},
				},
				default: 1000,
				description: 'Maximum number of tokens to generate',
			},
			{
				displayName: 'Stream',
				name: 'stream',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['chatLLM'],
						operation: ['sendPrompt', 'chatConversation'],
					},
				},
				default: false,
				description: 'Whether to stream the response',
			},
			{
				displayName: 'System Message',
				name: 'systemMessage',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				displayOptions: {
					show: {
						resource: ['chatLLM'],
						operation: ['sendPrompt', 'chatConversation'],
					},
				},
				default: '',
				placeholder: 'You are a helpful assistant...',
				description: 'System message to set the behavior of the assistant',
			},
			{
				displayName: 'Deployment ID',
				name: 'deploymentId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['deployment'],
						operation: ['getPrediction'],
					},
				},
				default: '',
				placeholder: 'Enter deployment ID',
				description: 'The ID of the deployment to get predictions from',
				required: true,
			},
			{
				displayName: 'Input Data',
				name: 'inputData',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['deployment'],
						operation: ['getPrediction'],
					},
				},
				default: '{}',
				description: 'Input data for the prediction as JSON',
				required: true,
			},
			{
				displayName: 'Project Name',
				name: 'projectName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['createProject'],
					},
				},
				default: '',
				placeholder: 'My AI Project',
				description: 'Name for the new project',
				required: true,
			},
			{
				displayName: 'Use Case',
				name: 'useCase',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['createProject'],
					},
				},
				options: [
					{
						name: 'Chat LLM',
						value: 'CHAT_LLM',
					},
					{
						name: 'Predictive Modeling',
						value: 'PREDICTIVE_MODELING',
					},
					{
						name: 'Forecasting',
						value: 'FORECASTING',
					},
				],
				default: 'CHAT_LLM',
				description: 'The use case for the project',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('abacusAiApi');
				const credentialsData = credentials as IDataObject;
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData: any;

				if (resource === 'chatLLM') {
					const prompt = this.getNodeParameter('prompt', i) as string;
					const model = this.getNodeParameter('model', i) as string;
					const temperature = this.getNodeParameter('temperature', i) as number;
					const maxTokens = this.getNodeParameter('maxTokens', i) as number;
					const systemMessage = this.getNodeParameter('systemMessage', i, '') as string;
					const stream = this.getNodeParameter('stream', i) as boolean;

					const messages: any[] = [];
					if (systemMessage) {
						messages.push({ role: 'system', content: systemMessage });
					}
					messages.push({ role: 'user', content: prompt });

					const options = {
						method: 'POST' as const,
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${credentialsData.apiKey}`,
						},
						url: 'https://routellm.abacus.ai/v1/chat/completions',
						body: {
							model,
							messages,
							temperature,
							max_tokens: maxTokens,
							stream,
						},
						json: true,
					};

					if (this.helpers && this.helpers.httpRequest) {
						const response = await this.helpers.httpRequest(options);
						responseData = {
							response: response.choices?.[0]?.message?.content || response,
							usage: response.usage,
							model: response.model,
						};
					}

				} else if (resource === 'deployment') {
					if (operation === 'listDeployments') {
						const options = {
							method: 'GET' as const,
							headers: {
								'apiKey': credentialsData.apiKey as string,
							},
							url: `${credentialsData.baseUrl}/api/v0/listDeployments`,
							json: true,
						};
						
						if (this.helpers && this.helpers.httpRequest) {
							responseData = await this.helpers.httpRequest(options);
						}
					} else if (operation === 'getPrediction') {
						const deploymentId = this.getNodeParameter('deploymentId', i) as string;
						const inputData = this.getNodeParameter('inputData', i) as string;

						const options = {
							method: 'POST' as const,
							headers: {
								'Content-Type': 'application/json',
								'apiKey': credentialsData.apiKey as string,
							},
							url: `${credentialsData.baseUrl}/api/v0/getModelPrediction`,
							body: {
								deploymentId,
								...JSON.parse(inputData),
							},
							json: true,
						};
						
						if (this.helpers && this.helpers.httpRequest) {
							responseData = await this.helpers.httpRequest(options);
						}
					}

				} else if (resource === 'project') {
					if (operation === 'listProjects') {
						const options = {
							method: 'GET' as const,
							headers: {
								'apiKey': credentialsData.apiKey as string,
							},
							url: `${credentialsData.baseUrl}/api/v0/listProjects`,
							json: true,
						};
						
						if (this.helpers && this.helpers.httpRequest) {
							responseData = await this.helpers.httpRequest(options);
						}
					} else if (operation === 'createProject') {
						const projectName = this.getNodeParameter('projectName', i) as string;
						const useCase = this.getNodeParameter('useCase', i) as string;

						const options = {
							method: 'POST' as const,
							headers: {
								'Content-Type': 'application/json',
								'apiKey': credentialsData.apiKey as string,
							},
							url: `${credentialsData.baseUrl}/api/v0/createProject`,
							body: {
								name: projectName,
								useCase,
							},
							json: true,
						};
						
						if (this.helpers && this.helpers.httpRequest) {
							responseData = await this.helpers.httpRequest(options);
						}
					}
				}

				returnData.push({ json: responseData || {} });
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				returnData.push({ json: { error: errorMessage } });
			}
		}

		return [returnData];
	}
} 