export default class JogoRequest {
    nome: string;
    descricao: string;
    preco: number;
    desenvolvedora: string;
    distribuidora: string;
    dataLancamento: Date;
    classificacao: number;
    imagemLink: string;

    constructor(nome: string, descricao: string, preco: number, desenvolvedora: string, distribuidora: string, lancamento: string, classificacao: number, imagemLink: string) {
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