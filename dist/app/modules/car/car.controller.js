"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const car_services_1 = require("./car.services");
const car_validation_1 = __importDefault(require("./car.validation"));
// create a new car logic
const handleCreateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carData = req.body;
        const validateCarData = car_validation_1.default.parse(carData);
        const newCar = yield car_services_1.CarServices.createCar(validateCarData);
        res.status(201).json({
            success: true,
            message: 'Car created successfully',
            data: newCar,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.issues[0].message,
            error: error.issues[0],
            // here i implemented error response from zod
        });
    }
});
// get all the car with query business logic
const handleGetAllCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // here i taken the query value
        const queryValue = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        const cars = yield car_services_1.CarServices.getAllCars(queryValue);
        if (!cars || !cars.length) {
            res.status(404).json({
                success: false,
                message: queryValue
                    ? `No cars found for "${queryValue}"`
                    : 'No cars found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Cars retrieved successfully',
            data: cars,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve cars',
            error: error.message,
        });
    }
});
// get a single car and car info by Id
const handleGetCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.carId;
        if (!carId || !mongoose_1.default.Types.ObjectId.isValid(carId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid car id',
            });
            return;
        }
        const car = yield car_services_1.CarServices.getCarById(carId);
        res.status(200).json({
            success: true,
            message: 'Car retrieved successfully',
            data: car,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve car',
            error: error.message,
        });
    }
});
// update a car information  by Id
const handleUpdateCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.carId;
        const updatedData = req.body;
        if (!carId || !mongoose_1.default.Types.ObjectId.isValid(carId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid car found with this id. Please enter a valid id',
            });
            return;
        }
        const updatedCar = yield car_services_1.CarServices.updateCarById(carId, updatedData);
        res.status(200).json({
            success: true,
            message: 'Car updated successfully',
            data: updatedCar,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update car',
            error: error.message,
        });
    }
});
// delete a car by Id
const handleDeleteCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.carId;
        if (!carId || !mongoose_1.default.Types.ObjectId.isValid(carId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid car found with this id. Please enter a valid id',
            });
            return;
        }
        yield car_services_1.CarServices.deleteCarById(carId);
        res.status(200).json({
            success: true,
            message: 'Car deleted successfully',
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete car',
            error: error.message,
        });
    }
});
exports.CarController = {
    handleCreateCar,
    handleGetAllCar,
    handleGetCarById,
    handleUpdateCarById,
    handleDeleteCarById,
};
