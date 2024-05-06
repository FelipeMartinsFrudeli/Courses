import { Request, Response } from "express";
import { Todo } from "../models/Todo";

export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();
    res.json({ list });
}

export const add = async (req: Request, res: Response) => {

    if (!req.body.title) {
        res.json({ error: 'Data not sent!' });
        return;
    }

    let item = await Todo.create({
        title: req.body.title,
        done: req.body.done ? true : false
    });

    res.status(201).json({ item });
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    let todo = await Todo.findByPk(id);
    if (!todo) {
        res.json({ error: 'Item not found!' });
        return;
    }

    const { title, done } = req.body;

    if (title) todo.title = title;
    if (done.toLowerCase() == 'true' || done === '1') todo.done = true; 
    if (done.toLowerCase() == 'false' || done === '0') todo.done = false;

    await done.save();

    res.json({ item: todo });
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    let todo = await Todo.findByPk(id);
    if (!todo) {
        res.json({ error: 'Item not found!' });
        return;
    }
    
    await todo.destroy();
    res.json({});
}