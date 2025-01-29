"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.get('/verify', (0, auth_1.default)('user'), order_controller_1.orderController.verifyPayment);
router.post('/create-order', (0, auth_1.default)('user'), (0, validateRequest_1.default)(order_validation_1.orderValidations.orderValidationSchema), order_controller_1.orderController.handlePlaceOrder);
router.get('/get-my-orders', (0, auth_1.default)('user'), order_controller_1.orderController.handleGetAllUsersOrders);
exports.orderRoutes = router;
