// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Usuario from "../models/usuario";

// Global Config
export const usuariosRouter = express.Router();

// GET
usuariosRouter.get("/", async (req: Request, res: Response) => {
    try {
        const usuarios = (await collections.usuarios?.find({}).toArray()) as Usuario[];

        res.status(200).send(usuarios)
    } catch (error) {
        res.status(500).send("Erro ao buscar todos os usuarios: " + error)
    }
});

usuariosRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const Usuario = (await collections.usuarios?.findOne(query)) as Usuario;

        if (Usuario)
            res.status(200).send(Usuario);
    } catch (error) {
        res.status(500).send(`Erro ao buscar o Usuario com ID ${id}: ${error}`)
    }

});

// POST
usuariosRouter.post("/", async (req: Request, res: Response) => {
    try {
        const novoUsuario: Usuario = req.body;

        const result = await collections.usuarios?.insertOne(novoUsuario);

        result
            ? res.status(201).send(`Usuario criado com sucesso. Id: ${result.insertedId}`) : res.status(500).send("Falha ao criar novo Usuario.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Erro ao criar Usuario: " + error);
    }
});

// PUT
usuariosRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedUsuario: Usuario = req.body as Usuario;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.usuarios?.updateOne(query, { $set: updatedUsuario });

        result
            ? res.status(200).send(`Usuario com id ${id} atualizado com sucesso`)
            : res.status(304).send(`Usuario com id: ${id} nao atualizado`);
    } catch (error) {
        console.error(error);
        res.status(400).send("Erro ao atualizar Usuario: " + error);
    }
});

// DELETE
usuariosRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.usuarios?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Usuario id: ${id} removido com sucesso`);
        } else if (!result) {
            res.status(400).send(`Falha ao remover usuario com id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Usuario com id ${id} nao existe`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send("Erro ao deletar Usuario: " + error);
    }
});