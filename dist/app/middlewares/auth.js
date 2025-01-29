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
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const user_utils_1 = require("../modules/user/user.utils");
const tryCatchAsync_1 = __importDefault(require("../utils/tryCatchAsync"));
const auth = (...requiredRoles) => {
    return (0, tryCatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'you are not authorized');
        }
        const decoded = (0, user_utils_1.verifyToken)(token, config_1.default.jwt_access_secret);
        const { role, userId } = decoded;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'you are not access this resource');
        }
        if (user === null || user === void 0 ? void 0 : user.isBlocked) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Your account is blocked, you can not perform this action');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'you are not authorized to access this resource');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
