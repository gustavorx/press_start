import express from "express";
import { connectToDatabase } from "./services/database.service"

// Rotas
import { jogosRouter } from "./routes/jogos.router";
import { usuariosRouter } from "./routes/usuarios.router";


const app = express();
const porta = 8080;

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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