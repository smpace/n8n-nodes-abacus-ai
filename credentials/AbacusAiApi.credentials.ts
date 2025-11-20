import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AbacusAiApi implements ICredentialType {
	name = 'abacusAiApi';

	displayName = 'RouteLLM API';

	documentationUrl = 'https://routellm.abacus.ai';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your RouteLLM API key. Get it from the RouteLLM dashboard.',
			required: true,
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.abacus.ai',
			description: 'The base URL for legacy Abacus.AI API operations (deployments and projects)',
			required: true,
		},
	];
} 