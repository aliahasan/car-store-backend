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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
    const { minPrice, maxPrice } = query, cQuery = __rest(query, ["minPrice", "maxPrice"]);
    const carsQuery = new QueryBuilder_1.default(car_model_1.default.find(), cQuery)
        .search(car_constant_1.carSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()
        .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity)
        .year();
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
const getAllCarsCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield car_model_1.default.aggregate([
        {
            $group: {
                _id: '$category',
                image: { $first: '$images' },
            },
        },
        { $project: { category: '$_id', image: 1, _id: 0 } },
    ]);
    if (!categories.length) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'No category found');
    }
    return categories;
});
const getAllBrands = () => __awaiter(void 0, void 0, void 0, function* () {
    const brands = yield car_model_1.default.distinct('brand');
    if (!brands) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'No brands found');
    }
    return brands;
});
const getUsedAndReconditionCar = () => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield car_model_1.default.find({
        carStatus: { $in: ['Recondition', 'Used'] },
    });
    if (!cars) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Cars are not found ');
    }
    return cars;
});
exports.CarServices = {
    createCar,
    getAllCars,
    getCarById,
    updateCarById,
    deleteCarById,
    getAllCarsCategory,
    getAllBrands,
    getUsedAndReconditionCar,
};
