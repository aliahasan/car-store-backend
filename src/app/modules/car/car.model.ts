import mongoose, { Schema } from 'mongoose';
import { ICar } from './car.interface';

const carSchema = new Schema<ICar>(
  {
    brand: {
      type: String,
      required: [
        true,
        'The brand name is required. Please provide a valid car brand.',
      ],
    },
    model: {
      type: String,
      required: [
        true,
        'The model name is required. Please specify the car model.',
      ],
    },
    year: {
      type: Number,
      required: [
        true,
        'The manufacturing year is required. Please provide a valid year.',
      ],
      min: [
        1886,
        'The year must be 1886 or later, the year of the first car invention.',
      ],
      max: [
        new Date().getFullYear(),
        'The year cannot exceed the current year.',
      ],
    },
    category: {
      type: String,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message:
          '{VALUE} is not a valid category. Category must be one of the following: Sedan, SUV, Truck, Coupe, or Convertible.',
      },
      required: [
        true,
        'The car category is required. Please select a valid category.',
      ],
    },
    description: {
      type: String,
      required: [true, 'A brief description of the car is required.'],
      maxlength: [300, 'The description should not exceed 300 characters.'],
    },
    quantity: {
      type: Number,
      required: [
        true,
        'The quantity is required. Please specify how many cars are available.',
      ],
    },
    inStock: {
      type: Boolean,
      default: true,
      required: [
        true,
        'The stock status is required. Please specify if the car is in stock.',
      ],
    },
    price: {
      type: Number,
      required: [true, 'The price is required. Please specify the car price.'],
      min: [1, 'The price must be at least $1.'],
      validate: {
        validator: (value: number) => value > 0,
        message: 'The price must be a positive number.',
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export const Car = mongoose.model<ICar>('Car', carSchema);
