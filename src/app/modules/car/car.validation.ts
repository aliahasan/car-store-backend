import { z } from 'zod';

const carValidationData = z.object({
  brand: z
    .string({ message: 'brand name is required and must be a string type' })
    .min(2, 'Please provide a valid car brand name.'),
  model: z
    .string({
      message: 'The model name is required, model name must be a string',
    })
    .min(1, 'Please specify the car model.'),
  year: z
    .number()
    .int()
    .gte(
      1886,
      'The year must be 1886 or later, the year of the first car invention.'
    )
    .lte(new Date().getFullYear(), 'The year cannot exceed the current year.'),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({
      message:
        'Category must be one of the following: Sedan, SUV, Truck, Coupe, or Convertible.',
    }),
  }),
  description: z
    .string()
    .min(20, 'A brief description of the car is required.'),
  quantity: z
    .number({ message: 'quantity is is required' })
    .int({ message: 'quantity have to be an integer number and at least 1' }),
  inStock: z.boolean().default(true),
  price: z
    .number({
      message: 'price is required.please provide a valid price of the car',
    })
    .positive('The price must be a positive number.')
    .min(1, 'The price must be at least $1.'),
});

export default carValidationData;
