import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found!' });
});

server.listen(PORT, () => console.log(`port: ${PORT}`));