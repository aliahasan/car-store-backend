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
exports.CarServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_constant_1 = require("./car.constant");
const car_model_1 = __importDefault(require("./car.model"));
// creating a  new car
const createCar = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    const car = new car_model_1.default(carData);
    const result = yield car.save();
    return result;
});
// get all the car services logic here
const getAllCars = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const carsQuery = new QueryBuilder_1.default(car_model_1.default.find(), query)
        .search(car_constant_1.carSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield carsQuery.countTotal();
    const result = yield carsQuery.queryModel;
    return {
        meta,
        result,
    };
});
// get a specific  car by its own id
const getCarById = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.default.findById(carId);
    if (!car) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'car not found');
    }
    return car;
});
// update  a specific car by its own id
const updateCarById = (carId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.default.findByIdAndUpdate(carId, payload, {
        new: true,
        runValidators: true,
    });
    if (!car) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'something went wrong. please try again');
    }
    return car;
});
// delete  a specific car by its own id
const deleteCarById = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.default.findByIdAndDelete(carId);
    if (!car) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Car not found');
    }
    return true;
});
exports.CarServices = {
    createCar,
    getAllCars,
    getCarById,
    updateCarById,
    deleteCarById,
};
