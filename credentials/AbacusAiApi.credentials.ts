import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AbacusAiApi implements ICredentialType {
	name = 'abacusAiApi';

	displayName = 'Abacus.AI API';

	documentationUrl = 'https://abacus.ai/help/api/ref';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your Abacus.AI API key. Get it from <a href="https://abacus.ai/app/profile/apikey" target="_blank">API Keys Dashboard</a>.',
			required: true,
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.abacus.ai',
			description: 'The base URL for Abacus.AI API (leave as default unless using a custom deployment)',
			required: true,
		},
	];
} 