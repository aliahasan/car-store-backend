"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const statusCode = 400;
    const error = err.issues.map((issue) => ({
        field: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    return {
        statusCode,
        message: error[0].message,
        error,
    };
};
exports.default = handleZodError;
