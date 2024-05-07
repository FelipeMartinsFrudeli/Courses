import { NextFunction, Request, Response } from "express";
import passport from "passport";
import dotenv from "dotenv";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

dotenv.config();

const notAuthorized = { status: 401, message: "Not Authorized" };
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async (payload, done) => {

    const user = await User.findByPk(payload.id);
    if (!user) {
        return done(notAuthorized, false);
    }

    done(null, user);
}));

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string);
}

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err: any, user: any) => {
        req.user = user;
        return user ? next() : next(notAuthorized);
    })(req, res, next);
}

export default passport;

// npm i passport-jwt && npm i -D @types/passport-jwt @types/jsonwebtoken
// npm i passport-http

// Configurar Strategy
// Basic Auth

// const notAuthorized = { status: 401, message: "Not Authorized" };

// passport.use(new BasicStrategy(async (email, password, done) => {
    
//     if (!email || !password) {
//         return done(notAuthorized, false);
//     }

//     const user = await User.findOne({
//         where: { email, password }
//     });

//     if (!user) {
//         return done(notAuthorized, false);
//     }

//     return done(null, user);
// }));

// export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
//     passport.authenticate('basic', (err: any, user: any) => {
//         return user ? next() : next(notAuthorized);
//     })(req, res, next);
// }
