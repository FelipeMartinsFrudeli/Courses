import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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