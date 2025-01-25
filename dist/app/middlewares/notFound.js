"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleNotFoundRoute = (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
};
exports.default = handleNotFoundRoute;
