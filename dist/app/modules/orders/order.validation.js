"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = require("zod");
exports.orderValidation = zod_1.z.object({
    email: zod_1.z
        .string({ message: 'email is required.Please provide a valid email' })
        .email('Invalid email format. Please provide a valid email address.'),
    car: zod_1.z.string({
        message: 'Invalid car format. Please provide a valid car Id',
    }),
    quantity: zod_1.z
        .number({ message: 'quantity is required' })
        .int()
        .min(1, 'quantity must be at least 1'),
    totalPrice: zod_1.z.number(),
});
// Use this type for TypeScript type inference
