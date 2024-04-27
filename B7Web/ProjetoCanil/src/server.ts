import mustacheExpress from 'mustache-express';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import mainRoutes from './routes/index';

dotenv.config();
const PORT = process.env.PORT || 3000;
const public_folder = path.join(__dirname, '../public');
const views_folder = path.join(__dirname, 'views');

const server = express();

server.set('view engine', 'mustache');
server.set('views', views_folder);
server.engine('mustache', mustacheExpress());

server.disable('x-powered-by');
server.use(express.json());
server.use(express.static(public_folder));
server.use(express.urlencoded({ extended: true }));

server.use(mainRoutes);

server.use((req, res) => {
    res.status(404).render('pages/404');
})

server.listen(PORT);