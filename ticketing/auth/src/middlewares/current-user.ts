import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.headers.cookie) {
            const cookies = cookie.parse(req.headers.cookie as string);
            if (!cookies?.jwt) {
                return next();
            }
            const payload = jwt.verify(
                cookies.jwt,
                process.env.JWT_KEY!
            ) as UserPayload;
            req.currentUser = payload;
        }

    } catch (err) {
    }

    next();
};
