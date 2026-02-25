import { Request, Response, NextFunction } from "express";

/**
 * Custom API error with an HTTP status code and machine-readable error code.
 */
export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public code: string,
        message: string
    ) {
        super(message);
        this.name = "ApiError";
    }
}

/**
 * Global Express error handler.
 * Catches ApiErrors and unknown errors, returning a consistent JSON envelope.
 */
export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    console.error("[API Error]", err);

    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
            },
        });
        return;
    }

    res.status(500).json({
        error: {
            code: "INTERNAL_ERROR",
            message: "An unexpected error occurred.",
        },
    });
}
