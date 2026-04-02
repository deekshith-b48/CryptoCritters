"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`[Error] ${statusCode}: ${message}`);
    res.status(statusCode).json({
        success: false,
        error: message
    });
};
exports.errorMiddleware = errorMiddleware;
