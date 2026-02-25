import { Request, Response, NextFunction } from "express";
import { ApiError } from "./errorHandler";

/**
 * Extend Express Request to include the authenticated user's ID and email.
 * In production, the API Gateway authorizer (or frontend session proxy)
 * injects these as headers.
 */
export interface AuthenticatedRequest extends Request {
    userId?: string;
    userEmail?: string;
}

/**
 * Authentication middleware.
 *
 * For the hackathon, the Next.js frontend proxies API calls with the user's
 * session info attached as custom headers:
 *   - x-user-id:    The Auth.js user ID
 *   - x-user-email: The user's email address
 *
 * In production, an API Gateway Lambda Authorizer would validate the JWT
 * and inject these automatically.
 */
export function requireAuth(
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
): void {
    const userId = req.headers["x-user-id"] as string | undefined;
    const userEmail = req.headers["x-user-email"] as string | undefined;

    if (!userId) {
        throw new ApiError(401, "UNAUTHORIZED", "Missing authentication. Please log in.");
    }

    req.userId = userId;
    req.userEmail = userEmail;
    next();
}
