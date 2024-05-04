import { Router } from 'express';
import { createUser, createUsers } from '../services/user';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({ name: req.body.name, email: req.body.email });
    if (!user) {
        return res.status(500).json({ error: "erro ao criar" });
    }

    res.status(201).json({ user });
});

mainRouter.post('/users', async (req, res) => {
    const result = await createUsers([
        { name: 'test', email: 'test@email.com' }
    ]);
    if (!result) {
        return res.status(500).json({ error: "erro ao criar" });
    }

    res.status(201).json({ result });
});