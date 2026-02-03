import { defineCollection, z } from 'astro:content';

export const collections = {
	portfolio: defineCollection({
		type: 'content',
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
