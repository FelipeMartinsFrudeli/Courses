import { Request, Response } from "express";
import { User } from "../models/User";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.json({ error: 'Invalid data' });
        return;
    }
    
    let hasUser = await User.findOne({ where: { email } });
    if (hasUser) {
        res.json({ error: 'Email already has created' });
        return;
    }

    let newUser = await User.create({ email, password });

    const token = JWT.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '2h' }
    );

    res.status(201).json({ id: newUser.id, token });
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.json({ error: 'Invalid data' });
        return;
    }
    
    let user = await User.findOne({ where: { email, password } });
    if (!user) {
        res.json({ status: false });
        return;
    }

    const token = JWT.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '2h' }
    );

    res.json({ status: true, token });
}

export const list = async (req: Request, res: Response) => {
    console.log("list")

    let page = parseInt(req.query.page as string);
    page = page > 0 ? page * 10 : 0;
    
    let users = await User.findAll({
        offset: page,
        limit: 10
    });
    let list: string[] = [];

    for (const i in users) {
        list.push(users[i].email);
    }

    res.json({ list });
}