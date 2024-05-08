import { Request, Response } from "express";
import { generateToken } from "../config/passport";
import * as UserService from "../services/UserService";

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ error: 'Invalid data' });
        return;
    }

    const newUser = await UserService.createUser(email, password);
    if (newUser instanceof Error) {
        res.json({ error: newUser.message });
        return;
    }

    const token = generateToken({ id: newUser.id });
    res.status(201).json({ id: newUser.id, token });
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ error: 'Invalid data' });
        return;
    }
    
    const user = await UserService.findByEmail(email);
    if (!user || !UserService.matchPassword(password, user.password)) {
        res.json({ status: false });
        return;
    }

    const token = generateToken({ id: user.id });
    res.json({ status: true, token });
}

export const list = async (req: Request, res: Response) => {
    // console.log("USER", req.user)

    let page = parseInt(req.query.page as string);
    page = page > 0 ? page * 10 : 0;
    
    let users = await UserService.all(page);
    let list: string[] = [];

    for (const i in users) {
        list.push(users[i].email);
    }

    res.json({ list });
}