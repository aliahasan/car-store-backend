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
exports.orderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const tryCatchAsync_1 = __importDefault(require("../../utils/tryCatchAsync"));
const order_services_1 = require("./order.services");
const handlePlaceOrder = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const orderData = req.body;
    const result = yield order_services_1.orderService.placeOrder(userId, orderData, req.ip);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'Order placed successfully',
        data: result,
    });
}));
const verifyPayment = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_services_1.orderService.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Order verified successfully',
        data: order,
    });
}));
const handleGetAllUsersOrders = (0, tryCatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield order_services_1.orderService.getAllUsersOrders(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'User orders fetched successfully',
        data: result,
    });
}));
const handleTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_services_1.orderService.calculateTotalRevenue();
        res.status(200).json({
            success: true,
            message: ' Revenue calculated successfully',
            data: {
                totalRevenue,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: 'Failed to calculate total revenue',
        });
    }
});
exports.orderController = {
    handlePlaceOrder,
    handleTotalRevenue,
    handleGetAllUsersOrders,
    verifyPayment,
};
