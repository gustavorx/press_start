export class PedidoModel {
    _id: string;
    usuario: string;
    produto: string;
    data: string;
    valor: string;

    constructor(id: string, usuario: string, produto: string, data: string, valor: string) {
        this._id = id;
        this.usuario = usuario;
        this.produto = produto;
        this.data = data;
        this.valor = valor;
    }
}