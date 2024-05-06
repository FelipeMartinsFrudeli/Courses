import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/api";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use(apiRoutes);

server.use((req, res) => {
    res.json({ error: "Endpoint not found!" });
});

server.listen(PORT);