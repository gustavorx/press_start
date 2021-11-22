import { ObjectId } from "mongodb";

export default class Pedido {
    usuario: string;
    produto: string;
    data: string;
    valor: number;

    constructor(usuario: string, produto: string, data: string, valor: number, public id?: ObjectId){
        this.usuario = usuario;
        this.produto = produto;
        this.data = data;
        this.valor = valor;
    }
}
