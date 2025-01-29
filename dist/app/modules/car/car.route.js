"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const car_controller_1 = require("./car.controller");
const car_validation_1 = require("./car.validation");
const router = express_1.default.Router();
router.post('/create-car', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.carValidations.carValidationSchema), car_controller_1.CarController.handleCreateCar);
router.get('/all-cars', car_controller_1.CarController.handleGetAllCar);
router.get('/:carId', car_controller_1.CarController.handleGetCarById);
router.put('/update/:carId', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.carValidations.updateCarValidationSchema), car_controller_1.CarController.handleUpdateCarById);
router.delete('/delete/:carId', (0, auth_1.default)('admin'), car_controller_1.CarController.handleDeleteCarById);
exports.carRoutes = router;
