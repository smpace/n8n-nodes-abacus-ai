import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class AbacusAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Abacus.AI',
		name: 'abacusAi',
		icon: 'file:abacusai.svg',
		group: ['ai'],
		version: 1,
		description: 'Interact with Abacus.AI LLM services for prompt writing and AI operations',
		defaults: {
			name: 'Abacus.AI',
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
						name: 'GPT-4',
						value: 'gpt-4',
					},
					{
						name: 'GPT-4 Turbo',
						value: 'gpt-4-turbo',
					},
					{
						name: 'GPT-3.5 Turbo',
						value: 'gpt-3.5-turbo',
					},
					{
						name: 'Claude 3 Opus',
						value: 'claude-3-opus',
					},
					{
						name: 'Claude 3 Sonnet',
						value: 'claude-3-sonnet',
					},
					{
						name: 'Claude 3 Haiku',
						value: 'claude-3-haiku',
					},
					{
						name: 'Llama 2 70B',
						value: 'llama-2-70b',
					},
					{
						name: 'Mixtral 8x7B',
						value: 'mixtral-8x7b',
					},
				],
				default: 'gpt-4-turbo',
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

					const messages: any[] = [];
					if (systemMessage) {
						messages.push({ role: 'system', content: systemMessage });
					}
					messages.push({ role: 'user', content: prompt });

					const options = {
						method: 'POST' as const,
						headers: {
							'Content-Type': 'application/json',
							'apiKey': credentialsData.apiKey as string,
						},
						url: `${credentialsData.baseUrl}/api/v0/chat/completions`,
						body: {
							model,
							messages,
							temperature,
							max_tokens: maxTokens,
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