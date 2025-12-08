import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    description: z.string(),
  }),
});

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    coverImage: z.string().optional(),
  }),
});

export const collections = {
  pages,
  services,
  portfolio,
};
