import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})

export class PagamentoComponent {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
   
  esconderDescricao = false;
  esconderCartao = true;
  esconderBoleto = true;
  esconderPix = true;
  esconderMetodos = false;
  creditoFinalizado = false;

  numeroCartaoValido = false;
  cpfValido = false;
  dataValidadeValida = false;
  cvvValido = false;
  nomeValido = false;
  telefoneValido = false;
  nascimentoValido = false;

  erroNumeroCartao = false;
  erroCpf = false;
  erroDataValidade = false;
  erroCvv = false;
  erroNome = false;
  erroTelefone = false;
  erroNascimento = false;

  boletoNomeValido = false;
  boletoCpfValido = false;

  erroBoletoNome = false;
  erroBoletoCpf = false;

  numeroCartao: string = "";
  dataValidade: string = "";
  cvv: string = "";
  nomeCompleto: string = "";
  cpf: string = "";
  telefone: string = "";
  nascimento: string = "";
  qrCode: string = "";

  boletoNome: string = "";
  boletoCpf: string = "";


  mostrarCartao(){
    this.esconderCartao = false;
    this.esconderMetodos = true;
    this.esconderDescricao = true;
  }

  mostrarBoleto(){
    this.esconderBoleto = false;
    this.esconderMetodos = true;
    this.esconderDescricao = true;
  }

  mostrarPix(){
    this.esconderPix = false;
    this.esconderMetodos = true;
    this.esconderDescricao = true;
    this.gerarCodigoPix();
  }

  alterarPagameto(){
    this.esconderCartao = true;
    this.esconderBoleto = true;
    this.esconderPix = true;
    this.esconderMetodos = false;
    this.esconderDescricao = false;
    this.creditoFinalizado = false;
  }

  concluirPix(){
    this.comprar();
    this.esconderPix = true;
    this.creditoFinalizado = true;
  }

  gerarCodigoPix(){
    var part1: string = this.stringAleatoria(14, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var part2: string = this.stringAleatoria(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var part3: string = this.stringAleatoria(4, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var part4: string = this.stringAleatoria(4, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var part5: string = this.stringAleatoria(4, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var part6: string = this.stringAleatoria(45, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var part7: string = this.stringAleatoria(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var part8: string = this.stringAleatoria(19, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    this.qrCode = part1 + "brgovbcbpix" + part2 + "-" + part3 + "-" + part4 + "-" + part5 + part6 + "PRES_START6009SaoPauloBR" + part7 + "mpqrinter" + part8;
  }

  copiarCodigo(showToast = true){
    var copyText: string = this.qrCode;
  
    navigator.clipboard.writeText(copyText);

    if (showToast) {
      this.toastr.success('Código copiado: ' + copyText);
    }
  }

  stringAleatoria(length: number, chars: string | any[]) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }

  validaNumeroCartao(){
    if(this.numeroCartao.length <= 0){
      this.erroNumeroCartao = true;
    } else {
      this.numeroCartaoValido = true;
    }
  }

  validaCpf(){
    if(this.cpf.length <= 0){
      this.erroCpf = true;
    } else {
      this.cpfValido = true;
    }
  }

  validaDataValidade(){
    if(this.dataValidade.length <= 0){
      this.erroDataValidade = true;
    } else {
      this.dataValidadeValida = true;
    }
  }

  validaCvv(){
    if(this.cvv.length <= 0){
      this.erroCvv = true;
    } else {
      this.cvvValido = true;
    }
  }

  validaNome(){
    if(this.nomeCompleto.length <= 0){
      this.erroNome = true;
    } else {
      this.nomeValido = true;
    }
  }

  validaTelefone(){
    if(this.telefone.length <= 0){
      this.erroTelefone = true;
    } else {
      this.telefoneValido = true;
    }
  }

  validaNascimento(){
    if(this.nascimento.length <= 0){
      this.erroNascimento = true;
    } else {
      this.nascimentoValido = true;
    }
  }

  validaBoletoNome(){
    if(this.boletoNome.length <= 0){
      this.erroBoletoNome = true;
    } else {
      this.boletoNomeValido = true;
    }
  }

  validaBoletoCpf(){
    if(this.boletoCpf.length <= 0){
      this.erroBoletoCpf = true;
    } else {
      this.boletoCpfValido = true;
    }
  }

  getProdutos() {
    var carrinho = localStorage.getItem('carrinho');

    var carrinhoArr = [];
    if (carrinho) {
      carrinhoArr = JSON.parse(carrinho);
    } else {
      carrinhoArr = [];
    }

    return carrinhoArr;
  }

  getValorTotal() {
    var produtosArr = this.getProdutos();
    var valorTotal = 0;

    produtosArr.forEach((produto: { preco: number; }) => {
      var valorInt = produto.preco
      valorTotal += valorInt;
    });

    return valorTotal;

  }

  recebeCarrinho(){
    var carrinho = localStorage.getItem('carrinho');

    var carrinhoArr = [];

    if (carrinho) {
      carrinhoArr = JSON.parse(carrinho);
    } else {
      carrinhoArr = [];
    }

    return carrinhoArr;
  }   

  finalizarPagamentoCredito(){
    this.validaNumeroCartao();
    this.validaCpf();
    this.validaDataValidade();
    this.validaCvv();
    this.validaNome();
    this.validaTelefone();
    this.validaNascimento();

    if(this.cpfValido && this.numeroCartaoValido 
      && this.dataValidadeValida && this.cvvValido 
      && this.nomeValido && this.telefoneValido 
      && this.nascimentoValido){
        this.comprar();
      this.creditoFinalizado = true;
    }    
  }

  finalizarPagamentoBoleto(){
    this.validaBoletoNome();
    this.validaBoletoCpf();

    if(this.boletoNomeValido && this.boletoCpfValido){
      this.comprar();
      this.router.navigate([`/pagamento/boleto/${this.boletoCpf}/${this.boletoNome}`]);
    }
  }

  comprar(showToast = true) {
    var carrinhoArr = this.recebeCarrinho();
    console.log(carrinhoArr);
    let today = new Date().toLocaleDateString();

    carrinhoArr.forEach((jogo: { nome: string; preco: number }) => {
      var pedidoData: any = {
        usuario: localStorage.getItem('token'),
        produto: jogo.nome,
        data: today,
        valor: jogo.preco
      }

      this.http.post("http://localhost:8080/Pedidos", pedidoData, { responseType: 'text' }).subscribe();
    });

    carrinhoArr.forEach((jogo: { id: string; }) => {
      this.removerProduto(jogo.id);      
    });

    if (showToast) {
      this.toastr.success('Concluído!');
    }
  }

  removerProduto(id: string) {
    var carrinho = localStorage.getItem('carrinho');

    var carrinhoArr = [];

    if (carrinho) {
      carrinhoArr = JSON.parse(carrinho);
    } else {
      carrinhoArr = [];
    }

    var novoCarrinho: { id: string; }[] = [];
    carrinhoArr.forEach((jogo: { id: string; }) => {
      if (jogo.id != id) {
        novoCarrinho.push(jogo)
      }
    });

    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho)); 
  }

}