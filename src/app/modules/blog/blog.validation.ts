import { z } from 'zod';
export const createBlogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  image: z.string().url('Invalid image URL'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  tags: z.string().optional(),
});

export const updateBlogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  image: z.string().url('Invalid image URL').optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional(),
  tags: z.string().optional(),
});

export const blogsValidations = {
  createBlogSchema,
  updateBlogSchema,
};
