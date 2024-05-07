import express, { ErrorRequestHandler, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { MulterError } from "multer";
import apiRoutes from "./routes/api";
import passport from "passport";

const public_folder = path.join(__dirname, '../public');
dotenv.config();

const server = express();

// origin: '*'
// methods: ['GET', 'POST', ...]
server.use(cors());

server.use(express.static(public_folder));
server.use(express.urlencoded({ extended: true }));

server.use(passport.initialize());

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: "Endpoint not founded!" });
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if (err instanceof MulterError) {
        res.json({ error: err.code });
        return;
    }

    res.status(err.status || 400).json({ error: err.message || "An error ocurred!" });
}

server.use(errorHandler);

server.listen(process.env.PORT);