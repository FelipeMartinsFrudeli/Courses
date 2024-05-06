import { NextFunction, Request, Response } from "express";
// import { User } from "../models/User";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {

        const [authType, token] = (req.headers.authorization || "").split(' ');
        if (!req.headers.authorization || authType != "Bearer") {
            res.status(403).json({ error: 'Invalid data' });
            return;
        }

        try {
            JWT.verify(
                token,
                process.env.JWT_SECRET_KEY as string
            );
        } catch(err) {
            res.status(403).json({ error: 'Not Authorized' });
            return;
        }

        next();
    }
}

// Basic Auth
// test@email.com:123 -> dGVzdEBlbWFpbC5jb206MTIzCg==

// Headers
// Authorization: Basic dGVzdEBlbWFpbC5jb206MTIzCg==

// let hash: string = req.headers.authorization.substring(6);
// let decoded: string = Buffer.from(hash, 'base64').toString();
// let data: string[] = decoded.split(':');

// if (data.length != 2) {
//     res.status(403).json({ error: 'Invalid data' });
//     return;
// }