import { StatusCodes } from 'http-status-codes';
import mongoose, { Schema, Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { CarMOdel, TCar } from './car.interface';

const carSchema = new Schema<TCar, CarMOdel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Van'],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    color: {
      type: [String],
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
      min: 1,
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      required: true,
    },
    transmission: {
      type: String,
      enum: ['Manual', 'Automatic'],
      required: true,
    },
    engineCapacity: {
      type: Number,
      required: true,
      min: 0,
    },
    seatingCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    features: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    images: {
      type: [String],
      required: true,
    },
    warranty: {
      type: String,
      required: true,
      default: '2 year',
    },
    carStatus: {
      type: String,
      enum: ['Recondition', 'Used'],
    },
    isStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

carSchema.statics.isCarExist = async function (
  carId: Types.ObjectId
): Promise<TCar> {
  const car = await this.findById(carId);
  if (!car) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Car not found');
  }
  return car;
};

const Car = mongoose.model<TCar, CarMOdel>('Car', carSchema);
export default Car;
