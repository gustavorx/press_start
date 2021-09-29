// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Jogo from "../models/jogo";

// Global Config
export const jogosRouter = express.Router();

// GET
jogosRouter.get("/", async (req: Request, res: Response) => {
    try {
        const jogos = (await collections.jogos?.find({}).toArray()) as Jogo[];

        res.status(200).send(jogos)
    } catch (error) {
        res.status(500).send("Erro ao buscar todos os jogos: " + error)
    }
});

jogosRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const jogo = (await collections.jogos?.findOne(query)) as Jogo;

        if (jogo)
            res.status(200).send(jogo);
    } catch (error) {
        res.status(500).send(`Erro ao buscar o jogo com ID ${id}: ${error}`)
    }

});

// POST
jogosRouter.post("/", async (req: Request, res: Response) => {
    try {
        const novoJogo: Jogo = req.body;

        const result = await collections.jogos?.insertOne(novoJogo);

        result
            ? res.status(201).send(`Jogo criado com sucesso. Id: ${result.insertedId}`)
            : res.status(500).send("Falha ao criar novo jogo.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Erro ao criar jogo: " + error);
    }
});

// PUT

// DELETE