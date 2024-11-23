import { z } from 'zod';

export const orderValidation = z.object({
  email: z
    .string({ message: 'email is required.Please provide a valid email' })
    .email('Invalid email format. Please provide a valid email address.'),
  car: z.string({
    message: 'Invalid car format. Please provide a valid car Id',
  }),
  quantity: z
    .number({ message: 'quantity is required' })
    .int()
    .min(1, 'quantity must be at least 1'),
  totalPrice: z.number(),
});

// Use this type for TypeScript type inference
