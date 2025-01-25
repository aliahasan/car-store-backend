import express from 'express';
import { CarController } from './car.controller';
const router = express.Router();

router.post('/', CarController.handleCreateCar);
router.get('/', CarController.handleGetAllCar);
router.get('/:carId', CarController.handleGetCarById);
router.put('/:carId', CarController.handleUpdateCarById);
router.delete('/:carId', CarController.handleDeleteCarById);
export const carRoutes = router;
