// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Usuario {
    nome: string;
    cpf: string;
    telefone: string;
    dtNasc: string;
    sexo: string;
    email: string;
    senha: string;
    tipo: string;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento: string;

    constructor(nome: string, cpf: string, telefone: string, dtNasc: string, sexo: string, email: string, senha: string, tipo: string, cep: string, rua: string, numero: string, bairro: string, cidade: string, estado: string, complemento: string, public id?: ObjectId) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.dtNasc = dtNasc;
        this.sexo = sexo;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.complemento = complemento;
    }
}