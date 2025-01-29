"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidations = void 0;
const zod_1 = require("zod");
const carSchema = zod_1.z.object({
    car: zod_1.z.string().length(24),
    quantity: zod_1.z.number().int().positive(),
});
const orderValidationSchema = zod_1.z.object({
    cars: zod_1.z.array(carSchema),
});
exports.orderValidations = {
    orderValidationSchema,
};
