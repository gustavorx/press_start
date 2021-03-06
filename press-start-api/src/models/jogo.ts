export default class Jogo {
    _id: string;
    nome: string;
    descricao: string;
    preco: number;
    desenvolvedora: string;
    distribuidora: string;
    dataLancamento: Date;
    classificacao: number;
    imagemLink: string;

    constructor(id: string, nome: string, descricao: string, preco: number, desenvolvedora: string, distribuidora: string, lancamento: string, classificacao: number, imagemLink: string) {
        this._id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.desenvolvedora = desenvolvedora;
        this.distribuidora = distribuidora;
        this.dataLancamento = new Date(lancamento);
        this.classificacao = classificacao;
        this.imagemLink = imagemLink;
    }
}