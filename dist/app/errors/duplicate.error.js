"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    var _a;
    const statusCode = 400;
    const match = (_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.match(/index: ([^ ]+)/);
    const field = match ? match[1].split('_')[0] : 'unknown';
    const extractedMessage = `${field} is already exist`;
    const error = [
        {
            field: field,
            message: extractedMessage,
        },
    ];
    return {
        statusCode,
        message: 'Duplicate entry',
        error,
    };
};
exports.default = handleDuplicateError;
