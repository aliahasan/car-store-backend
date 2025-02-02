import { z } from 'zod';

const CarCategoryEnum = z.enum([
  'Sedan',
  'SUV',
  'Truck',
  'Coupe',
  'Convertible',
  'Van',
  'Other',
]);

const FuelTypeEnum = z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']);

const TransmissionEnum = z.enum(['Manual', 'Automatic']);

export const carValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.string(),
  price: z.number().min(0, 'Price must be a positive number'),
  category: CarCategoryEnum,
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(0, 'Quantity cannot be negative'),
  inStock: z.boolean().optional(),
  color: z.array(z.string().min(1)).nonempty('Color array cannot be empty'),
  mileage: z.number().min(0, 'Mileage cannot be negative'),
  fuelType: FuelTypeEnum,
  transmission: TransmissionEnum,
  engineCapacity: z.number().min(0, 'Engine capacity must be positive'),
  seatingCapacity: z.number().min(1, 'Seating capacity must be at least 1'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  rating: z.number().min(0, 'Rating must be between 0 and 5').max(5).optional(),
  images: z.array(z.string().url('Must be a valid image URL')).optional(),
  warranty: z.string().min(1, 'Warranty information is required'),
  discount: z.number().min(0).max(100).optional(),
});

const updateCarValidationSchema = carValidationSchema.partial();

export const carValidations = {
  carValidationSchema,
  updateCarValidationSchema,
};
// export type ICarValidation = z.infer<typeof CarSchema>;
