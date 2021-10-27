// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import Usuario from "../models/usuario";

// Global Config
export const loginRouter = express.Router();

//Fazer login
loginRouter.get("/:email/:senha", async (req: Request, res: Response) => {
    const email = req?.params?.email;
    const senha = req?.params?.senha;
    try {
        const query = { email, senha };
        const Usuario = (await collections.usuarios?.findOne(query)) as Usuario;

        if (Usuario)
            res.status(200).send(Usuario);
        else {
            res.status(404).send("Usuario nao encontrado");
        }
    } catch (error) {
        res.status(500).send(`Erro ao buscar o Usuario com E-mail ${email} e Senha ${senha}: ${error}`)
    }
});

//Checar CPF
loginRouter.get("/:cpf", async (req: Request, res: Response) => {
    const cpf = req?.params?.cpf;

    try {
        const query = { cpf };
        const Usuario = (await collections.usuarios?.findOne(query)) as Usuario;

        if (Usuario)
            res.status(200).send(Usuario);
        else {
            res.status(404).send("Usuario nao encontrado");
        }
    } catch (error) {
        res.status(500).send(`Erro ao buscar o Usuario com CPF ${cpf}`)
    }
});

//Atualizar senha
loginRouter.put("/:cpf", async (req: Request, res: Response) => {
    const cpf = req?.params?.cpf;

    try {
        const updatedUsuario: Usuario = req.body as Usuario;
        const query = { cpf };

        const result = await collections.usuarios?.updateOne(query, { $set: updatedUsuario });
        
        result
            ? res.status(200).send(`Usuario com CPF ${cpf} atualizado com sucesso`)
            : res.status(304).send(`Usuario com CPF ${cpf} nao atualizado`);
    } catch (error) {
        console.error(error);
        res.status(400).send("Erro ao atualizar Usuario: " + error);
    }
});