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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServices = void 0;
const car_model_1 = require("./car.model");
// creating a  new car
const createCar = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCar = yield car_model_1.Car.create(carData);
        return newCar;
    }
    catch (error) {
        throw new Error(error.message || 'Failed to create the car');
    }
});
// get all the car services logic here
const getAllCars = (queryValue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {};
        if (queryValue) {
            const search = new RegExp(queryValue, 'i'); // converted to case insensitive string by regexp
            query.$or = [{ brand: search }, { model: search }, { category: search }];
        }
        const cars = yield car_model_1.Car.find(query).sort({ createdAt: -1 });
        return cars;
    }
    catch (error) {
        throw new Error(error.message || 'Failed to retrieved all the cars');
    }
});
// get a specific  car by its own id
const getCarById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_model_1.Car.findById(_id);
        if (!car) {
            throw new Error('Something went wrong! Invalid input');
        }
        return car;
    }
    catch (error) {
        throw new Error(error);
    }
});
// update  a specific car by its own id
const updateCarById = (_id, updatedCarData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_model_1.Car.findByIdAndUpdate(_id, updatedCarData, {
            new: true,
        });
        if (!car) {
            throw new Error('something went wrong. please try again');
        }
        return car;
    }
    catch (error) {
        throw new Error(error);
    }
});
// delete  a specific car by its own id
const deleteCarById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_model_1.Car.findByIdAndDelete(_id);
        if (!car) {
            throw new Error('Car not found');
        }
        return car;
    }
    catch (error) {
        throw new Error(error.message || 'Failed to delete the car');
    }
});
exports.CarServices = {
    createCar,
    getAllCars,
    getCarById,
    updateCarById,
    deleteCarById,
};
