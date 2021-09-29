// External Dependencies
import * as mongoDB from "mongodb";

// Global Variables
export const collections: { jogos?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {

    const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb+srv://pressstart:pressstart@cluster0.tae7v.mongodb.net/PressStart?retryWrites=true&w=majority");

    await client.connect();

    const db: mongoDB.Db = client.db("PressStart");

    const gamesCollection: mongoDB.Collection = db.collection("Jogo");

    collections.jogos = gamesCollection;
}