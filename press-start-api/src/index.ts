import express from "express";
import { connectToDatabase } from "./services/database.service"
import { jogosRouter } from "./routes/jogos.router";

const app = express();
const porta = 8080;

app.use(express.json());

connectToDatabase()
    .then(() => {
        app.use("/jogos", jogosRouter);

        app.listen(porta, () => {
            console.log(`API em execução na url http://localhost:${porta}`);
        });
    })
    .catch((error: Error) => {
        console.error("Falha ao se conectar ao banco de dados.", error);
        process.exit();
    });