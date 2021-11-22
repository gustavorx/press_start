import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Pedido from '../models/pedido';
import { collections } from "../services/database.service";

export const pedidosRouter = express.Router();

// GET
pedidosRouter.get("/", async (req: Request, res: Response) => {
    try {
        const pedidos = (await collections.pedidos?.find({}).toArray()) as Pedido[];

        res.status(200).send(pedidos)
    } catch (error) {
        res.status(500).send("Erro ao buscar todos os pedidos: " + error)
    }
});

pedidosRouter.get("/:usuario", async (req: Request, res: Response) => {
    const usuario = req?.params?.usuario;
    try {
        const query = { usuario };
        const pedidos = (await collections.pedidos?.find(query).toArray()) as Pedido[];

        res.status(200).send(pedidos)
    } catch (error) {
        res.status(500).send("Erro ao buscar todos os pedidos: " + error)
    }

});

// pedidosRouter.get("/:id", async (req: Request, res: Response) => {
//     const id = req?.params?.id;
//     console.log("id" + id);

//     try {
//         const query = { _id: new ObjectId(id) };
//         console.log("query" + query);
//         const pedido = (await collections.pedidos?.findOne(query)) as Pedido;

//         if (pedido) res.status(200).json(pedido);
//         else res.status(402).json(`Jogo ${id} não encontrado `)
//     } catch (error) {
//         res.status(500).json(`Erro ao buscar o jogo com ID ${id}: ${error}`)
//     }

// });

// POST
pedidosRouter.post("/", async (req: Request, res: Response) => {
    try {
        const novoPedido: Pedido = req.body;

        const result = await collections.pedidos?.insertOne(novoPedido);

        result
            ? res.status(201).send(`Pedido criado com sucesso. Id: ${result.insertedId}`) : res.status(500).send("Falha ao criar novo Pedido.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Erro ao criar Pedido: " + error);
    }
});

// PUT
pedidosRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedPedido: Pedido = req.body as Pedido;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.pedidos?.updateOne(query, { $set: updatedPedido });

        result
            ? res.status(200).send(`Pedido com id ${id} atualizado com sucesso`)
            : res.status(304).send(`Pedido com id: ${id} nao atualizado`);
    } catch (error) {
        console.error(error);
        res.status(400).send("Erro ao atualizar Pedido: " + error);
    }
});
