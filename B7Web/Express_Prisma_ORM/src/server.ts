import express, { urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';

import { mainRouter } from './routes/main';

const port = process.env.PORT || 3000;
const server = express();

server.disable('x-powered-by');
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.use(express.json());

server.use(mainRouter);

server.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
})