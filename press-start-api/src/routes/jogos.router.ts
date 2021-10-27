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

        if (jogo) res.status(200).send(jogo);
        else res.status(402).send(`Jogo ${id} não encontrado `)
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
jogosRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const jogoAtualizado: Jogo = req.body as Jogo;
        const query = { _id: new ObjectId(id) };

        const result = await collections.jogos?.updateOne(query, { $set: jogoAtualizado });

        result
            ? res.status(200).send(`Jogo ${id} atualizado com sucesso`)
            : res.status(304).send(`Jogo ${id} não foi atualizado`);
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
jogosRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.jogos?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Jogo ${id} removido com sucesso`);
        } else if (!result) {
            res.status(400).send(`Falha ao remover o jogo ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Jogo com id ${id} não existe`);
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});