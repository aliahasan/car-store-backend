import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { carSearchableFields } from './car.constant';
import { TCar } from './car.interface';
import Car from './car.model';

// creating a  new car
const createCar = async (carData: TCar) => {
  const car = new Car(carData);
  const result = await car.save();
  return result;
};

// get all the car services logic here
const getAllCars = async (query: Record<string, unknown>) => {
  const carsQuery = new QueryBuilder(Car.find(), query)
    .search(carSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await carsQuery.countTotal();
  const result = await carsQuery.queryModel;
  return {
    meta,
    result,
  };
};

// get a specific  car by its own id
const getCarById = async (carId: string) => {
  const car = await Car.findById(carId);
  if (!car) {
    throw new AppError(StatusCodes.NOT_FOUND, 'car not found');
  }
  return car;
};

// update  a specific car by its own id
const updateCarById = async (carId: string, payload: Partial<TCar>) => {
  const car = await Car.findByIdAndUpdate(carId, payload, {
    new: true,
    runValidators: true,
  });
  if (!car) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'something went wrong. please try again'
    );
  }
  return car;
};

// delete  a specific car by its own id
const deleteCarById = async (carId: string) => {
  const car = await Car.findByIdAndDelete(carId);
  if (!car) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Car not found');
  }
  return true;
};

export const CarServices = {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
};
