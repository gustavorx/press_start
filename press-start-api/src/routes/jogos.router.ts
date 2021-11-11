// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Jogo from "../models/jogo";
import JogoRequest from "../models/jogo-request";

// Global Config
export const jogosRouter = express.Router();

// GET
jogosRouter.get("/", async (req: Request, res: Response) => {
    try {
        const jogos = (await collections.jogos?.find({}).toArray()) as Jogo[];

        res.status(200).json(jogos)
    } catch (error) {
        res.status(500).json("Erro ao buscar todos os jogos: " + error)
    }
});

jogosRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const jogo = (await collections.jogos?.findOne(query)) as Jogo;

        if (jogo) res.status(200).json(jogo);
        else res.status(402).json(`Jogo ${id} não encontrado `)
    } catch (error) {
        res.status(500).json(`Erro ao buscar o jogo com ID ${id}: ${error}`)
    }

});

// POST
jogosRouter.post("/", async (req: Request, res: Response) => {
    try {
        const response = req.body;
        const novoJogo: JogoRequest = new JogoRequest(response.nome, response.descricao, response.preco, response.desenvolvedora, response.distribuidora, response.lancamento, response.classificacao, response.imagemLink, response.youtubeId);

        const result = await collections.jogos?.insertOne(novoJogo);

        result
            ? res.status(201).json(`Jogo criado com sucesso. Id: ${result.insertedId}`)
            : res.status(500).json("Falha ao criar novo jogo.");
    } catch (error) {
        res.status(400).json("Erro ao criar jogo: " + error);
    }
});

// PUT
jogosRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const response = req.body;
        const jogoAtualizado: JogoRequest = new JogoRequest(response.nome, response.descricao, response.preco, response.desenvolvedora, response.distribuidora, response.lancamento, response.classificacao, response.imagemLink, response.youtubeId);

        const query = { _id: new ObjectId(id) };

        const result = await collections.jogos?.updateOne(query, { $set: jogoAtualizado });

        result
            ? res.status(200).json(`Jogo ${id} atualizado com sucesso`)
            : res.status(304).json(`Jogo ${id} não foi atualizado`);
    } catch (error: any) {
        res.status(400).json(error.message);
    }
});

// DELETE
jogosRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.jogos?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).json(`Jogo ${id} removido com sucesso`);
        } else if (!result) {
            res.status(400).json(`Falha ao remover o jogo ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).json(`Jogo com id ${id} não existe`);
        }
    } catch (error: any) {
        res.status(400).json(error.message);
    }
});