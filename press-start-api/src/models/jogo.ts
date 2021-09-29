// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Jogo {
    nome: string;
    distribuidora: string;
    descricao: string;
    atributoTeste: string = "";

    constructor(nome: string, distribuidora: string, descricao: string, public id?: ObjectId) {
        this.nome = nome;
        this.distribuidora = distribuidora;
        this.descricao = descricao;
    }
}