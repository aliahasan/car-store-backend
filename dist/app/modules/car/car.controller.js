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
const car_services_1 = require("./car.services");
const car_validation_1 = __importDefault(require("./car.validation"));
// create a new car logic
const handleCreateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carData = req.body;
        // here its  validating carData via zod
        const validateCarData = car_validation_1.default.parse(carData);
        const newCar = yield car_services_1.CarServices.createCar(validateCarData);
        if (newCar) {
            res.status(201).json({
                status: true,
                message: 'Car created successfully',
                data: newCar,
            });
            return;
        }
    }
    catch (error) {
        // here i implemented the zod error response
        res.status(500).json({
            success: false,
            message: 'Validation failed',
            error: (error === null || error === void 0 ? void 0 : error.issues[0]) || error.message,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        });
    }
});
//business logic to get all the car with query
const handleGetAllCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // here i taken the query value
        const queryValue = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        const cars = yield car_services_1.CarServices.getAllCars(queryValue);
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
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to retrieve cars',
            error: error.message,
        });
    }
});
// get a single car and car info by Id
const handleGetCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.carId;
        const car = yield car_services_1.CarServices.getCarById(carId);
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
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: 'no car found',
            error: error.message,
        });
    }
});
// update a car information  by Id
const handleUpdateCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedCar = yield car_services_1.CarServices.updateCarById(carId, updatedData);
        res.status(200).json({
            status: true,
            message: 'Car updated successfully',
            data: updatedCar,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: 'Something went wrong while updating the car',
            error: error.message,
        });
    }
});
// delete a car by Id
const handleDeleteCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.carId;
        if (!carId) {
            res.status(400).json({
                status: false,
                message: 'Something went wrong. Please try again with valid info',
            });
            return;
        }
        yield car_services_1.CarServices.deleteCarById(carId);
        res.status(200).json({
            status: true,
            message: 'Car deleted successfully',
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: 'Something went wrong while deleting !',
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
