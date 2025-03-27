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
  const { minPrice, maxPrice, ...cQuery } = query;
  const carsQuery = new QueryBuilder(Car.find(), cQuery)
    .search(carSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity)
    .year();
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

const getAllCarsCategory = async () => {
  const categories = await Car.aggregate([
    {
      $group: {
        _id: '$category',
        image: { $first: '$images' },
      },
    },
    { $project: { category: '$_id', image: 1, _id: 0 } },
  ]);

  if (!categories.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No category found');
  }
  return categories;
};

const getAllBrands = async () => {
  const brands = await Car.distinct('brand');
  if (!brands) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No brands found');
  }
  return brands;
};

const getUsedAndReconditionCar = async () => {
  const cars = await Car.find({
    carStatus: { $in: ['Recondition', 'Used'] },
  });
  if (!cars) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cars are not found ');
  }
  return cars;
};

export const CarServices = {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
  getAllCarsCategory,
  getAllBrands,
  getUsedAndReconditionCar,
};
