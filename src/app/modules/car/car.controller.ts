/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CarServices } from './car.services';
import carValidationData from './car.validation';
// create a new car logic
const handleCreateCar = async (req: Request, res: Response) => {
  try {
    const carData = req.body;

    // here its  validating carData via zod
    const validateCarData = carValidationData.parse(carData);
    const newCar = await CarServices.createCar(validateCarData);
    if (newCar) {
      res.status(201).json({
        status: true,
        message: 'Car created successfully',
        data: newCar,
      });
      return;
    }
  } catch (error: any) {
    // here i implemented the zod error response
    res.status(500).json({
      success: false,
      message: 'Validation failed',
      error: error?.issues[0] || error.message,
      stack: error?.stack,
    });
  }
};

//business logic to get all the car with query
const handleGetAllCar = async (req: Request, res: Response) => {
  try {
    // here i taken the query value
    const queryValue = req?.query?.searchTerm as string | undefined;
    const cars = await CarServices.getAllCars(queryValue);
    if (!cars || !cars.length) {
      res.status(404).json({
        status: false,
        message: queryValue
          ? `No cars found for "${queryValue}"`
          : 'No cars found',
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: 'Cars retrieved successfully',
      data: cars,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: 'Failed to retrieve cars',
      error: error.message,
    });
  }
};

// get a single car and car info by Id
const handleGetCarById = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    const car = await CarServices.getCarById(carId);
    if (!car) {
      res.status(404).json({
        status: false,
        message: 'No car found',
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: 'Car retrieved successfully',
      data: car,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: 'Failed to retrieve car',
      error: error.message,
    });
  }
};

// update a car information  by Id
const handleUpdateCarById = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    const updatedData = req.body;
    if (!carId) {
      res.status(400).json({
        status: false,
        message: 'Something went wrong. Please try again with valid info',
      });
      return;
    }
    if (!updatedData || Object.keys(updatedData).length === 0) {
      res.status(400).json({
        status: false,
        message: 'Updated data is required.',
      });
      return;
    }
    const updatedCar = await CarServices.updateCarById(carId, updatedData);
    res.status(200).json({
      status: true,
      message: 'Car updated successfully',
      data: updatedCar,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong while updating the car',
      error: error.message,
    });
  }
};

// delete a car by Id
const handleDeleteCarById = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    if (!carId) {
      res.status(400).json({
        status: false,
        message: 'Something went wrong. Please try again with valid info',
      });
      return;
    }
    await CarServices.deleteCarById(carId);
    res.status(200).json({
      status: true,
      message: 'Car deleted successfully',
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong while deleting !',
      error: error.message,
    });
  }
};

export const CarController = {
  handleCreateCar,
  handleGetAllCar,
  handleGetCarById,
  handleUpdateCarById,
  handleDeleteCarById,
};
