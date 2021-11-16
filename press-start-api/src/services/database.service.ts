// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { jogos?: mongoDB.Collection, usuarios?: mongoDB.Collection, pedidos?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {

    dotenv.config();

    // Usuário e senha do bd
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING ?? "");

    await client.connect();

    const db: mongoDB.Db = client.db("PressStart");

    const gamesCollection: mongoDB.Collection = db.collection("Jogo");
    const usuarioCollection: mongoDB.Collection = db.collection("Usuario");
    const pedidosCollection: mongoDB.Collection = db.collection("Pedido");

    collections.jogos = gamesCollection;
    collections.usuarios = usuarioCollection;
    collections.pedidos = pedidosCollection;
}
