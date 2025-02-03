import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import tryCatchAsync from '../../utils/tryCatchAsync';
import { CarServices } from './car.services';

// create a new car logic
const handleCreateCar = tryCatchAsync(async (req, res) => {
  const carData = req.body;
  const result = await CarServices.createCar(carData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Car created successfully',
    data: result,
  });
});

//business logic to get all the car with query
const handleGetAllCar = tryCatchAsync(async (req, res) => {
  const query = req.query;
  const result = await CarServices.getAllCars(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Car retrieved successfully',
    data: result.result,
    meta: result.meta,
  });
});

// get a single car and car info by Id
const handleGetCarById = tryCatchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.getCarById(carId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Car retrieved successfully',
    data: result,
  });
});

// update a car information  by Id
const handleUpdateCarById = tryCatchAsync(async (req, res) => {
  const { carId } = req.params;
  const carData = req.body;
  const result = await CarServices.updateCarById(carId, carData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Car updated successfully',
    data: result,
  });
});

// delete a car by Id
const handleDeleteCarById = tryCatchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.deleteCarById(carId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Car deleted successfully',
    data: result,
  });
});

export const CarController = {
  handleCreateCar,
  handleGetAllCar,
  handleGetCarById,
  handleUpdateCarById,
  handleDeleteCarById,
};
