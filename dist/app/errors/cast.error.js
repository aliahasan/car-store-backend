"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    const error = [
        {
            field: err.path,
            message: err.message,
        },
    ];
    return {
        statusCode,
        message: 'Invalid _id',
        error,
    };
};
exports.default = handleCastError;
