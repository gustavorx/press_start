import { Component } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})

export class PagamentoComponent {
   
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

  parcelas: number[] = [1, 2, 3];
  parcelaSelecionada: number = 1;

  numeroCartao: string = "";
  dataValidade: string = "";
  cvv: string = "";
  nomeCompleto: string = "";
  cpf: string = "";
  telefone: string = "";
  nascimento: string = "";
  qrCode: string = "";


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
    this.gerarCodigoPix()
  }

  alterarPagameto(){
    this.esconderCartao = true;
    this.esconderBoleto = true;
    this.esconderPix = true;
    this.esconderMetodos = false;
    this.esconderDescricao = false;
    this.creditoFinalizado = false;
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

  copiarCodigo(){
    var copyText: string = this.qrCode;
  
    navigator.clipboard.writeText(copyText);
  
    alert("Copied the text: " + copyText);
  }

  stringAleatoria(length: number, chars: string | any[]) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
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
        console.log("teste")
      this.creditoFinalizado = true;
    }    
  }

  validaNumeroCartao(){
    if(this.numeroCartao.length <= 0){
      this.erroNumeroCartao = true;
    } else {
      console.log("1");
      this.numeroCartaoValido = true;
    }
  }

  validaCpf(){
    if(this.cpf.length <= 0){
      this.erroCpf = true;
    } else {
      console.log("2");
      this.cpfValido = true;
    }
  }

  validaDataValidade(){
    if(this.dataValidade.length <= 0){
      this.erroDataValidade = true;
    } else {
      console.log("3");
      this.dataValidadeValida = true;
    }
  }

  validaCvv(){
    if(this.cvv.length <= 0){
      this.erroCvv = true;
    } else {
      console.log("4");
      this.cvvValido = true;
    }
  }

  validaNome(){
    if(this.nomeCompleto.length <= 0){
      this.erroNome = true;
    } else {
      console.log("5");
      this.nomeValido = true;
    }
  }

  validaTelefone(){
    if(this.telefone.length <= 0){
      this.erroTelefone = true;
    } else {
      console.log("6");
      this.telefoneValido = true;
    }
  }

  validaNascimento(){
    if(this.nascimento.length <= 0){
      this.erroNascimento = true;
    } else {
      console.log("7");
      this.nascimentoValido = true;
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

  getValorParcelado(){
    let total = this.getValorTotal();
    let parcelado = total / this.parcelaSelecionada;
    return parcelado;
  }
}