"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const carValidationData = zod_1.z.object({
    brand: zod_1.z
        .string({ message: 'brand name is required and must be a string type' })
        .min(2, 'Please provide a valid car brand name.'),
    model: zod_1.z
        .string({
        message: 'The model name is required, model name must be a string',
    })
        .min(1, 'Please specify the car model.'),
    year: zod_1.z
        .number()
        .int()
        .gte(1886, 'The year must be 1886 or later, the year of the first car invention.')
        .lte(new Date().getFullYear(), 'The year cannot exceed the current year.'),
    category: zod_1.z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
        errorMap: () => ({
            message: 'Category must be one of the following: Sedan, SUV, Truck, Coupe, or Convertible.',
        }),
    }),
    description: zod_1.z
        .string()
        .min(20, 'A brief description of the car is required.'),
    quantity: zod_1.z
        .number({ message: 'quantity is is required' })
        .int({ message: 'quantity have to be an integer number and at least 1' }),
    inStock: zod_1.z.boolean().default(true),
    price: zod_1.z
        .number({
        message: 'price is required.please provide a valid price of the car',
    })
        .positive('The price must be a positive number.')
        .min(1, 'The price must be at least $1.'),
});
exports.default = carValidationData;
