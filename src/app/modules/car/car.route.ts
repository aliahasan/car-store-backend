import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CarController } from './car.controller';
import { carValidations } from './car.validation';
const router = express.Router();

router.post(
  '/create-car',
  auth('admin'),
  validateRequest(carValidations.carValidationSchema),
  CarController.handleCreateCar
);
router.get('/all-cars', CarController.handleGetAllCar);
router.get('/categories', CarController.handleGetAllCarCategories);
router.get('/brands', CarController.handleGetAllBrands);
router.get('/recondition', CarController.handleReconditionAndUsedCars);
router.get('/:carId', CarController.handleGetCarById);

router.put(
  '/update/:carId',
  auth('admin'),
  validateRequest(carValidations.updateCarValidationSchema),
  CarController.handleUpdateCarById
);

router.delete(
  '/delete/:carId',
  auth('admin'),
  CarController.handleDeleteCarById
);

export const carRoutes = router;
