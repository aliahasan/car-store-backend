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
exports.orderController = void 0;
const order_services_1 = require("./order.services");
const order_validation_1 = require("./order.validation");
const handlePlaceOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        //  here passed the request body data to zod to validate
        const validateOrderInfo = order_validation_1.orderValidation.parse(orderData);
        const result = yield order_services_1.orderService.placeOrder(validateOrderInfo);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Order placed successfully',
                data: result,
            });
        }
    }
    catch (error) {
        // here i tried to implement the zod error response
        res.status(500).json({
            success: false,
            message: 'Validation failed',
            error: (error === null || error === void 0 ? void 0 : error.issues[0]) || error.message,
        });
    }
});
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
};
