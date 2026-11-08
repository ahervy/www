import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const site = 'https://arnaudhervy.com/';
const description = 'Developer documentation, content architecture, and tooling.';
const profiles = ['https://www.linkedin.com/in/arnaudhervy/', 'https://github.com/ahervy'];
const read = (name) => readFile(new URL(name, dist), 'utf8');

// Inspect attribute contracts without depending on quoting, spacing or attribute order.
function tags(html, name) {
	return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'gi'))].map((match) =>
		Object.fromEntries(
			[
				...match[1].matchAll(/([^\s=/'">]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g),
			].map(([, key, double, single, bare]) => [key.toLowerCase(), double ?? single ?? bare ?? ''])
		)
	);
}

function text(html) {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

async function files(directory = dist, prefix = '') {
	const result = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const name = `${prefix}${entry.name}`;
		if (entry.isDirectory())
			result.push(...(await files(new URL(`${entry.name}/`, directory), `${name}/`)));
		else result.push(name);
	}
	return result;
}

async function assertLocalAsset(reference, page = 'index.html') {
	const url = new URL(reference, new URL(page, site));
	if (url.origin !== new URL(site).origin) return;
	const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
	const resolved = path.resolve(fileURLToPath(dist), relative);
	assert.ok(resolved.startsWith(path.resolve(fileURLToPath(dist)) + path.sep), reference);
	assert.ok((await stat(resolved)).isFile(), `Missing local asset: ${reference}`);
}

test('homepage content, production canonical and social metadata', async () => {
	const html = await read('index.html');
	assert.match(html, /<!doctype html>/i);
	assert.match(text(html), /Arnaud Hervy/);
	assert.match(text(html), /Developer documentation, content architecture, and tooling/);
	assert.match(text(html), /I work on developer documentation and the systems around it/);
	assert.match(html, /<h1\b[^>]*>\s*Arnaud Hervy\s*<\/h1>/i);
	assert.match(html, /<title>\s*Arnaud Hervy\s*<\/title>/i);
	assert.equal(tags(html, 'html')[0].lang, 'en');
	assert.deepEqual(
		tags(html, 'link')
			.filter((tag) => tag.rel === 'canonical')
			.map((tag) => tag.href),
		[site]
	);
	const meta = Object.fromEntries(
		tags(html, 'meta').map((tag) => [tag.name ?? tag.property, tag.content])
	);
	assert.equal(meta.description, description);
	assert.equal(meta['og:title'], 'Arnaud Hervy');
	assert.equal(meta['og:description'], description);
	assert.equal(meta['og:type'], 'website');
	assert.equal(meta['og:url'], site);
	assert.equal(meta['twitter:card'], 'summary');
	assert.equal(meta['twitter:title'], 'Arnaud Hervy');
	assert.equal(meta['twitter:description'], description);
	assert.ok(!meta.robots?.includes('noindex'));
	for (const href of profiles) assert.ok(tags(html, 'a').some((tag) => tag.href === href));
});

test('homepage contains valid Person JSON-LD', async () => {
	const html = await read('index.html');
	const blocks = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
	assert.equal(blocks.length, 1);
	assert.equal(tags(`<script${blocks[0][1]}>`, 'script')[0].type, 'application/ld+json');
	const person = JSON.parse(blocks[0][2]);
	assert.equal(person['@context'], 'https://schema.org');
	assert.equal(person['@type'], 'Person');
	assert.equal(person.name, 'Arnaud Hervy');
	assert.equal(new URL(person.url).href, site);
	assert.deepEqual(person.sameAs, profiles);
});

test('custom 404 is noindex and has no canonical', async () => {
	const html = await read('404.html');
	assert.match(text(html), /Page not found/);
	assert.ok(
		tags(html, 'meta').some(
			(tag) => tag.name === 'robots' && tag.content.split(/[\s,]+/).includes('noindex')
		)
	);
	assert.equal(tags(html, 'link').filter((tag) => tag.rel === 'canonical').length, 0);
	assert.ok(tags(html, 'a').some((tag) => tag.href === '/'));
});

test('robots and sitemap form a production-only index excluding the 404', async () => {
	const robots = await read('robots.txt');
	assert.match(robots, /^User-agent:\s*\*\s*$/m);
	assert.match(robots, /^Allow:\s*\/\s*$/m);
	assert.match(robots, /^Sitemap:\s*https:\/\/arnaudhervy\.com\/sitemap-index\.xml\s*$/m);
	const locations = (xml) =>
		[...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => match[1]);
	const sitemapFiles = locations(await read('sitemap-index.xml'));
	assert.ok(sitemapFiles.length > 0);
	const pages = [];
	for (const reference of sitemapFiles) {
		const url = new URL(reference);
		assert.equal(url.origin, new URL(site).origin);
		await assertLocalAsset(reference);
		pages.push(...locations(await read(url.pathname.slice(1))));
	}
	assert.deepEqual(pages, [site]);
	assert.ok(!pages.some((url) => /\/404(?:\.html)?\/?$/.test(new URL(url).pathname)));
	assert.ok(
		tags(await read('index.html'), 'link').some(
			(tag) => tag.rel === 'sitemap' && tag.href === '/sitemap-index.xml'
		)
	);
});

test('referenced local HTML, CSS and manifest assets exist', async () => {
	for (const name of await files()) {
		if (name.endsWith('.html')) {
			const html = await read(name);
			for (const tag of tags(html, '[a-z][\\w:-]*')) {
				for (const key of ['src', 'poster']) if (tag[key]) await assertLocalAsset(tag[key], name);
				if (tag.srcset)
					for (const candidate of tag.srcset.split(','))
						await assertLocalAsset(candidate.trim().split(/\s+/)[0], name);
			}
			for (const link of tags(html, 'link'))
				if (link.href && link.rel !== 'canonical') await assertLocalAsset(link.href, name);
		}
		if (/\.(html|css)$/.test(name)) {
			for (const [, reference] of (await read(name)).matchAll(
				/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g
			))
				await assertLocalAsset(reference, name);
		}
	}
	const manifest = JSON.parse(await read('site.webmanifest'));
	assert.ok(manifest.icons.length > 0);
	for (const icon of manifest.icons) await assertLocalAsset(icon.src);
});

test('Cloudflare header and redirect files are copied without changes', async () => {
	for (const name of ['_headers', '_redirects']) {
		assert.equal(await read(name), await readFile(new URL(`public/${name}`, root), 'utf8'));
	}
});

test('output remains static with JSON-LD only and no executable application JavaScript', async () => {
	// Pages compiles this directory separately; Astro's dist output alone cannot detect it.
	await assert.rejects(stat(new URL('functions/', root)), { code: 'ENOENT' });
	const output = await files();
	assert.ok(
		!output.some((name) =>
			/\.(?:[cm]?js|wasm)$|(?:^|\/)(?:functions|_worker\.js)(?:\/|$)/i.test(name)
		),
		'Unexpected executable or Pages Functions output'
	);
	for (const name of output.filter((name) => name.endsWith('.html'))) {
		const html = await read(name);
		for (const script of tags(html, 'script')) {
			assert.equal(script.type, 'application/ld+json', `Unexpected script in ${name}`);
			assert.equal(script.src, undefined);
		}
		for (const tag of tags(html, '[a-z][\\w:-]*')) {
			assert.ok(
				!Object.keys(tag).some((key) => /^on[a-z]+/.test(key)),
				'Unexpected inline event handler'
			);
			assert.ok(
				!Object.values(tag).some((value) => /^\s*javascript:/i.test(value)),
				'Unexpected JavaScript URL'
			);
		}
		assert.ok(!tags(html, 'link').some((tag) => tag.rel === 'modulepreload'));
	}
});
