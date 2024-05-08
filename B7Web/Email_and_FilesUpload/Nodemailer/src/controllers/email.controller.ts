import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const contato = async (req: Request, res: Response) => {
    // Configurar transporter
    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "13b7792737b3a4",
            pass: "d8656e78862050"
        }
    });
    
    // Configurar mensagem
    let message = {
        from: 'Hello world <helloworld@email.com>',
        to: 'teste@email.com',
        subject: 'subject test',
        html: '<strong>Hello</strong> world!',
        text: 'Hello world!'
    };

    // Enviar
    let info = await transport.sendMail(message);
    
    console.log(info);
    
    res.json({ success: true });
}