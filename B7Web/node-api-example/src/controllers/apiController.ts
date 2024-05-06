import { Request, Response } from "express";
import { Phrase } from "../models/Phrase";

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const uploadFile = async (req: Request, res: Response) => {
    res.json({});
}

export const createPhrase = async (req: Request, res: Response) => {
    let { author, txt } = req.body;

    let newPhrase = await Phrase.create({ author, txt });
    res.status(201).json({ id: newPhrase.id, author, txt });
}

// const result1 = await Test.findAndCountAll() --> {count: 2, rows: [{id: 1, name: 'a'}, {id: 2, name: 'b'}]}
// const result2 = await Test.findAll() --> [{id: 1, name: 'a'}, {id: 2, name: 'b'}]

export const listPhrases = async (req: Request, res: Response) => {

    let page = parseInt(req.query.page as string) || 0;
    page = page > 0 ? page * 10 : 0;

    let list = await Phrase.findAll({ offset: page, limit: 10 });
    res.json(list);
}

export const getPhrase = async (req: Request, res: Response) => {
    let { id } = req.params;

    let phrase = await Phrase.findByPk(id);
    if (!phrase) {
        res.json({ error: 'Phrase not found!' });
        return;
    }

    res.json(phrase);
}

export const updatePhrase = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { author, txt } = req.body;

    let phrase = await Phrase.findByPk(id);
    if (!phrase) {
        res.json({ error: 'Phrase not found!' });
        return;
    }

    phrase.author = author;
    phrase.txt = txt;
    await phrase.save();
    
    res.json(phrase);
}

export const deletePhrase = async (req: Request, res: Response) => {
    let { id } = req.params;
    await Phrase.destroy({ where: { id } });
    res.json({});
}
