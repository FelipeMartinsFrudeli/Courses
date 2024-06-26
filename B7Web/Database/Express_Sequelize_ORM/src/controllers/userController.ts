import { Request, Response } from 'express';
import { User } from '../models/User';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const createUser = async (req: Request, res: Response) => {

    let user = User.build({
        name: req.body.name,
        birth_date: req.body.birth_date
    });

    await user.save();
    res.redirect('/');
}

export const removeUser = async (req: Request, res: Response) => {
   
    let results = await User.findAll({ where: { id: req.params.user_id } });
    
    console.log(results);
    if (results.length > 0) {
        let user = results[0];
        await user.destroy();
    }
    
    res.redirect('/');
}