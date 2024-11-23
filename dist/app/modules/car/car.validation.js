"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const carValidationData = zod_1.z.object({
    brand: zod_1.z
        .string()
        .min(2, 'The brand name is required. Please provide a valid car brand.'),
    model: zod_1.z
        .string()
        .min(1, 'The model name is required. Please specify the car model.'),
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
        .min(20, 'A brief description of the car is required.')
        .max(300, 'The description should not exceed 300 characters.'),
    quantity: zod_1.z
        .number()
        .int()
        .gte(1, 'The quantity must be at least 1.')
        .lte(50, 'The quantity cannot exceed 100.'),
    inStock: zod_1.z.boolean().default(true),
    price: zod_1.z
        .number()
        .positive('The price must be a positive number.')
        .min(1, 'The price must be at least $1.'),
});
exports.default = carValidationData;
