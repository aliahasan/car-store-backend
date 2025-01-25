"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseError = (err) => {
    var _a;
    const statusCode = 400;
    const error = (_a = Object.values(err === null || err === void 0 ? void 0 : err.errors)) === null || _a === void 0 ? void 0 : _a.map((value) => ({
        field: value === null || value === void 0 ? void 0 : value.path,
        message: value === null || value === void 0 ? void 0 : value.message,
    }));
    return {
        statusCode,
        message: 'mongoose Validation error',
        error,
    };
};
exports.default = handleMongooseError;
