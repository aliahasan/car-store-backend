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
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const tryCatchAsync_1 = __importDefault(require("../../utils/tryCatchAsync"));
const car_services_1 = require("./car.services");
// create a new car logic
const handleCreateCar = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carData = req.body;
    const result = yield car_services_1.CarServices.createCar(carData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: 'Car created successfully',
        data: result,
    });
}));
//business logic to get all the car with query
const handleGetAllCar = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield car_services_1.CarServices.getAllCars(query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Car retrieved successfully',
        data: result.result,
        meta: result.meta,
    });
}));
// get a single car and car info by Id
const handleGetCarById = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params;
    const result = yield car_services_1.CarServices.getCarById(carId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Car retrieved successfully',
        data: result,
    });
}));
// update a car information  by Id
const handleUpdateCarById = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params;
    const carData = req.body;
    const result = yield car_services_1.CarServices.updateCarById(carId, carData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Car updated successfully',
        data: result,
    });
}));
// delete a car by Id
const handleDeleteCarById = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params;
    const result = yield car_services_1.CarServices.deleteCarById(carId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Car deleted successfully',
        data: result,
    });
}));
// get a single car and car info by Id
const handleGetAllCarCategories = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_services_1.CarServices.getAllCarsCategory();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Categories  retrieved successfully',
        data: result,
    });
}));
const handleGetAllBrands = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_services_1.CarServices.getAllBrands();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Brands are  retrieved successfully',
        data: result,
    });
}));
const handleReconditionAndUsedCars = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_services_1.CarServices.getUsedAndReconditionCar();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Cars are  retrieved successfully',
        data: result,
    });
}));
exports.CarController = {
    handleCreateCar,
    handleGetAllCar,
    handleGetCarById,
    handleUpdateCarById,
    handleDeleteCarById,
    handleGetAllCarCategories,
    handleGetAllBrands,
    handleReconditionAndUsedCars,
};
