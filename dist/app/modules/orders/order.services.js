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
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_model_1 = __importDefault(require("../car/car.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = __importDefault(require("./order.model"));
const order_utils_1 = require("./order.utils");
const placeOrder = (userId, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload.cars) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');
    }
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    if (user.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Your account is blocked, you can not place any order');
    }
    const cars = payload.cars;
    let totalPrice = 0;
    const carDetails = yield Promise.all(cars.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield car_model_1.default.findById(item.car);
        if (!car) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Car not found');
        }
        if (car.quantity < item.quantity || !car.isStock) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Car is out of stock');
        }
        const subtotal = car ? (car.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
    })));
    let order = yield order_model_1.default.create({
        user,
        cars: carDetails,
        totalPrice,
    });
    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        totalPrice: totalPrice,
        order_id: order._id,
        currency: 'BDT',
        customer_name: user.name,
        customer_address: user.address,
        customer_email: user.email,
        customer_phone: user.phone,
        customer_city: user.city,
        client_ip: client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePayment(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
// verifying the payment
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield order_model_1.default.startSession();
    session.startTransaction();
    try {
        const verifyOrderPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
        if (verifyOrderPayment.length) {
            const bankStatus = verifyOrderPayment[0].bank_status;
            if (bankStatus === 'Cancel' || bankStatus === 'Failed') {
                // Delete the order within the transaction
                yield order_model_1.default.findOneAndDelete({ 'transaction.id': order_id }, { session });
            }
            else {
                // Update the order transaction details
                const updatedOrder = yield order_model_1.default.findOneAndUpdate({ 'transaction.id': order_id }, {
                    'transaction.bank_status': verifyOrderPayment[0].bank_status,
                    'transaction.sp_code': verifyOrderPayment[0].sp_code,
                    'transaction.sp_message': verifyOrderPayment[0].sp_message,
                    'transaction.transactionStatus': verifyOrderPayment[0].transaction_status,
                    'transaction.method': verifyOrderPayment[0].method,
                    'transaction.date_time': verifyOrderPayment[0].date_time,
                    status: bankStatus === 'Success'
                        ? 'Paid'
                        : bankStatus === 'Failed'
                            ? 'Failed'
                            : bankStatus === 'Cancel'
                                ? 'Canceled'
                                : 'Pending',
                }, { new: true, session });
                if (bankStatus === 'Success' && updatedOrder) {
                    const carDetails = updatedOrder.cars;
                    if (Array.isArray(carDetails)) {
                        for (const car of carDetails) {
                            const carId = car.car;
                            const reduceQuantity = car.quantity;
                            yield car_model_1.default.findByIdAndUpdate(carId, { $inc: { quantity: -reduceQuantity } }, { new: true, session } // Include session
                            );
                        }
                    }
                }
            }
        }
        yield session.commitTransaction();
        return verifyOrderPayment;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
// calculate the total revenue by aggregation pipeline
const getAllUsersOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({ user: userId }).populate({
        path: 'cars.car',
    });
    if (!result || result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'No orders found');
    }
    return result;
});
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
    getAllUsersOrders,
    calculateTotalRevenue,
    verifyPayment,
};
