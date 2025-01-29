"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carValidations = exports.carValidationSchema = void 0;
const zod_1 = require("zod");
const CarCategoryEnum = zod_1.z.enum([
    'Sedan',
    'SUV',
    'Truck',
    'Coupe',
    'Convertible',
    'Van',
    'Other',
]);
const FuelTypeEnum = zod_1.z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']);
const TransmissionEnum = zod_1.z.enum(['Manual', 'Automatic']);
exports.carValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    brand: zod_1.z.string().min(1, 'Brand is required'),
    model: zod_1.z.string().min(1, 'Model is required'),
    year: zod_1.z
        .number()
        .min(1886, 'Year must be at least 1886')
        .max(new Date().getFullYear(), 'Year cannot be in the future'),
    price: zod_1.z.number().min(0, 'Price must be a positive number'),
    category: CarCategoryEnum,
    description: zod_1.z.string().min(1, 'Description is required'),
    quantity: zod_1.z.number().min(0, 'Quantity cannot be negative'),
    inStock: zod_1.z.boolean().optional(),
    color: zod_1.z.array(zod_1.z.string().min(1)).nonempty('Color array cannot be empty'),
    mileage: zod_1.z.number().min(0, 'Mileage cannot be negative'),
    fuelType: FuelTypeEnum,
    transmission: TransmissionEnum,
    engineCapacity: zod_1.z.number().min(0, 'Engine capacity must be positive'),
    seatingCapacity: zod_1.z.number().min(1, 'Seating capacity must be at least 1'),
    features: zod_1.z.array(zod_1.z.string()).min(1, 'At least one feature is required'),
    rating: zod_1.z.number().min(0, 'Rating must be between 0 and 5').max(5).optional(),
    images: zod_1.z.array(zod_1.z.string().url('Must be a valid image URL')).optional(),
    warranty: zod_1.z.string().min(1, 'Warranty information is required'),
    discount: zod_1.z.number().min(0).max(100).optional(),
});
const updateCarValidationSchema = exports.carValidationSchema.partial();
exports.carValidations = {
    carValidationSchema: exports.carValidationSchema,
    updateCarValidationSchema,
};
// export type ICarValidation = z.infer<typeof CarSchema>;
