import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

export const collections = {
	portfolio: defineCollection({
		loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			meta_description: z.string().optional(),
			summary: z.string(),
			publishDate: z.coerce.date().optional(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
			sample_url: z.string().optional(),
			audience: z.string().optional(),
			role: z.string().optional(),
			deliverables: z.array(z.string()).optional(),
			tools: z.array(z.string()).optional(),
			outcomes: z.array(z.string()).optional(),
		}),
	}),
};
