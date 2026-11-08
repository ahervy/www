import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests/browser',
	forbidOnly: Boolean(process.env.CI),
	workers: 1,
	retries: 0,
	timeout: 15_000,
	globalTimeout: 120_000,
	reporter: 'list',
	use: { baseURL: 'http://127.0.0.1:4321', browserName: 'chromium' },
	projects: [
		{
			name: 'desktop-chromium',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
		},
		{ name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
	],
	webServer: {
		// Keep Astro in the foreground so Playwright owns the server lifecycle.
		command: 'npm run preview -- --ignore-lock --host 127.0.0.1 --port 4321',
		url: 'http://127.0.0.1:4321',
		reuseExistingServer: false,
		timeout: 30_000,
	},
});
