import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import astroPlugin from 'eslint-plugin-astro';
import globals from 'globals';

export default [
	js.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
		},
		rules: {
			...typescriptPlugin.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/triple-slash-reference': 'off',
		},
	},
	...astroPlugin.configs.recommended,
	{
		ignores: [
			'node_modules',
			'dist',
			'.astro',
			'*.log',
			'.DS_Store',
			'package-lock.json',
			'pnpm-lock.yaml',
			'yarn.lock',
		],
	},
];
