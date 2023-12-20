import { defineCollection, z } from "astro:content";

const lingos = defineCollection({
  type: "data",
  schema: z.object({
    term: z.string(),
    definitions: z.array(
      z.object({
        language: z.string(),
        definition: z.string(),
        term_usage_example: z.string(),
        expanded: z.string().optional(),
      }),
    ),
  }),
});

export const collections = { lingos };
