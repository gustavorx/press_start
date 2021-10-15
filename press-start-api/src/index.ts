import express from "express";
import { connectToDatabase } from "./services/database.service"

// Rotas
import { jogosRouter } from "./routes/jogos.router";
import { usuariosRouter } from "./routes/usuarios.router";


const app = express();
const porta = 8080;

app.use(express.json());

connectToDatabase()
    .then(() => {
        app.use("/jogos", jogosRouter);
        app.use("/usuarios", usuariosRouter);

        app.listen(porta, () => {
            console.log(`API em execução na url http://localhost:${porta}`);
        });
    })
    .catch((error: Error) => {
        console.error("Falha ao se conectar ao banco de dados.", error);
        process.exit();
    });