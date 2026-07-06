import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const normalizedString = z.string().transform((value) => value.replace(/\s+/g, ' ').trim());

export const collections = {
	portfolio: defineCollection({
		loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
		schema: z.object({
			title: normalizedString,
			description: normalizedString,
			meta_description: normalizedString.optional(),
			summary: normalizedString,
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: normalizedString.optional(),
			sample_url: z.string().optional(),
			audience: normalizedString.optional(),
			role: normalizedString.optional(),
			deliverables: z.array(normalizedString).optional(),
			tools: z.array(normalizedString).optional(),
			outcomes: z.array(normalizedString).optional(),
		}),
	}),
};
