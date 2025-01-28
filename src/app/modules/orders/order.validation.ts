import { z } from 'zod';

const carSchema = z.object({
  car: z.string().length(24),
  quantity: z.number().int().positive(),
});

const orderValidationSchema = z.object({
  cars: z.array(carSchema),
});

export const orderValidations = {
  orderValidationSchema,
};
