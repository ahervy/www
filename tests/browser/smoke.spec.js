import { test as base, expect } from '@playwright/test';

const test = base.extend({
	page: async ({ page }, use) => {
		const errors = [];
		page.on('pageerror', (error) => errors.push(error.message));
		page.on('console', (message) => {
			if (message.type() === 'error') errors.push(message.text());
		});
		page.on('requestfailed', (request) =>
			errors.push(`${request.url()}: ${request.failure()?.errorText}`)
		);
		page.on('response', (response) => {
			if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
		});
		await use(page);
		expect(errors, 'Unexpected browser, network or console errors').toEqual([]);
	},
});

test('homepage renders, styles and assets load, and layout fits the viewport', async ({
	page,
	request,
}) => {
	const response = await page.goto('/');
	expect(response.status()).toBe(200);
	await expect(page).toHaveTitle('Arnaud Hervy');
	await expect(
		page.getByRole('heading', { level: 1, name: 'Arnaud Hervy', exact: true })
	).toBeVisible();
	await expect(
		page.getByText('Developer documentation, content architecture, and tooling', { exact: true })
	).toBeVisible();
	await expect(page.locator('.introduction')).toBeVisible();
	await expect(page.locator('footer')).toContainText('Arnaud Hervy');
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
		true
	);
	expect(await page.locator('body').evaluate((element) => getComputedStyle(element).margin)).toBe(
		'0px'
	);
	expect(
		await page.locator('.site-shell').evaluate((element) => getComputedStyle(element).display)
	).toBe('flex');
	expect(
		await page
			.getByRole('heading', { level: 1 })
			.evaluate((element) => parseFloat(getComputedStyle(element).fontSize))
	).toBeGreaterThan(40);
	const assets = await page
		.locator(
			'link[rel~="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], link[rel="manifest"]'
		)
		.evaluateAll((links) => links.map((link) => link.href));
	expect(assets.length).toBeGreaterThan(0);
	for (const url of assets) {
		const asset = await request.get(url);
		expect(asset.status(), url).toBe(200);
		expect((await asset.body()).length, url).toBeGreaterThan(0);
	}
});

test('navigation targets and keyboard skip link work', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute(
		'href',
		'https://www.linkedin.com/in/arnaudhervy/'
	);
	await expect(page.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute(
		'href',
		'https://github.com/ahervy'
	);
	const skip = page.getByRole('link', { name: 'Skip to main content' });
	await expect(skip).toHaveAttribute('href', '#main-content');
	await page.keyboard.press('Tab');
	await expect(skip).toBeFocused();
	await expect(skip).toBeInViewport();
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(/\/#main-content$/);
	await expect(page.locator('#main-content')).toBeFocused();
});

test('built 404 page renders and its return-home link works', async ({ page }) => {
	// Test the emitted file; Cloudflare-specific missing-route/status behavior is a preview check.
	await page.goto('/404.html');
	await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
	const home = page.getByRole('link', { name: 'Return home' });
	await expect(home).toHaveAttribute('href', '/');
	await home.click();
	await expect(page).toHaveURL('http://127.0.0.1:4321/');
	await expect(
		page.getByRole('heading', { level: 1, name: 'Arnaud Hervy', exact: true })
	).toBeVisible();
});
