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
exports.orderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const car_model_1 = require("../car/car.model");
const order_model_1 = __importDefault(require("./order.model"));
const placeOrder = (orderInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, car, quantity, totalPrice } = orderInfo;
        const selectedCar = yield car_model_1.Car.findById(car);
        if (!selectedCar) {
            throw new Error('Car not found. Please provide valid car information.');
        }
        // Ensure there is sufficient stock for the order
        if (!selectedCar.inStock || selectedCar.quantity < quantity) {
            throw new Error(`Insufficient stock. Car is not available anymore.`);
        }
        // Update car's inventory: reduce quantity and update stock status if necessary
        selectedCar.quantity -= quantity;
        if (selectedCar.quantity === 0) {
            selectedCar.inStock = false;
        }
        // Save the updated car inventory
        yield selectedCar.save();
        // Create a new order in the Order collection
        const order = new order_model_1.default({
            email: email,
            car: car,
            quantity: quantity,
            totalPrice: totalPrice,
        });
        // Save the new order to the database
        yield order.save();
        return order;
    }
    catch (error) {
        throw new Error(error.message || 'something went wrong');
    }
});
// calculate the total revenue by aggregation pipeline
const calculateTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield order_model_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                },
            },
        ]);
        return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
    }
    catch (error) {
        throw new Error(error.message || 'Failed to calculate total revenue');
    }
});
exports.orderService = {
    placeOrder,
    calculateTotalRevenue,
};
