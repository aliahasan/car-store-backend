"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const cast_error_1 = __importDefault(require("../errors/cast.error"));
const duplicate_error_1 = __importDefault(require("../errors/duplicate.error"));
const mongoose_error_1 = __importDefault(require("../errors/mongoose.error"));
const zod_error_1 = __importDefault(require("../errors/zod.error."));
const handleGlobalError = (err, req, res, next) => {
    let statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    let message = err === null || err === void 0 ? void 0 : err.message;
    let error = [
        {
            field: '',
            message: 'something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const zodErrorResponse = (0, zod_error_1.default)(err);
        statusCode = zodErrorResponse.statusCode;
        message = zodErrorResponse.message;
        error = zodErrorResponse.error;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const validationErrorResponse = (0, mongoose_error_1.default)(err);
        statusCode = validationErrorResponse === null || validationErrorResponse === void 0 ? void 0 : validationErrorResponse.statusCode;
        message = validationErrorResponse === null || validationErrorResponse === void 0 ? void 0 : validationErrorResponse.message;
        error = validationErrorResponse.error;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const duplicateError = (0, duplicate_error_1.default)(err);
        statusCode = duplicateError.statusCode;
        message = duplicateError.message;
        error = duplicateError.error;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const castErrorResponse = (0, cast_error_1.default)(err);
        statusCode = castErrorResponse === null || castErrorResponse === void 0 ? void 0 : castErrorResponse.statusCode;
        message = castErrorResponse === null || castErrorResponse === void 0 ? void 0 : castErrorResponse.message;
        error = castErrorResponse === null || castErrorResponse === void 0 ? void 0 : castErrorResponse.error;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        error = [{ field: '', message: err === null || err === void 0 ? void 0 : err.message }];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        error = [{ field: '', message: (err === null || err === void 0 ? void 0 : err.message) || message }];
    }
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = handleGlobalError;
