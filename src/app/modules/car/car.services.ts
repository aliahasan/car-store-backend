/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICar } from './car.interface';
import { Car } from './car.model';

// creating a  new car
const createCar = async (carData: ICar) => {
  try {
    const newCar = await Car.create(carData);
    return newCar;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create the car');
  }
};

// get all the car services logic here
const getAllCars = async (queryValue?: string) => {
  try {
    const query: any = {};
    if (queryValue) {
      const search = new RegExp(queryValue, 'i'); // converted to case insensitive string by regexp
      query.$or = [{ brand: search }, { model: search }, { category: search }];
    }
    const cars = await Car.find(query).sort({ createdAt: -1 });
    return cars;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to retrieved all the cars');
  }
};

// get a specific  car by its own id
const getCarById = async (_id: string) => {
  try {
    const car = await Car.findById(_id);
    if (!car) {
      throw new Error('Something went wrong! Invalid input');
    }
    return car;
  } catch (error: any) {
    throw new Error(error);
  }
};

// update  a specific car by its own id
const updateCarById = async (_id: string, updatedCarData: Partial<ICar>) => {
  try {
    const car = await Car.findByIdAndUpdate(_id, updatedCarData, {
      new: true,
    });
    if (!car) {
      throw new Error('something went wrong. please try again');
    }
    return car;
  } catch (error: any) {
    throw new Error(error);
  }
};

// delete  a specific car by its own id
const deleteCarById = async (_id: string) => {
  try {
    const car = await Car.findByIdAndDelete(_id);
    if (!car) {
      throw new Error('Car not found');
    }
    return car;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete the car');
  }
};

export const CarServices = {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
};
