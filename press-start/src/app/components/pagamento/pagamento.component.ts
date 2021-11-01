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

  numero: string = "";
  validade: string = "";
  cvv: string = "";
  nomeCompleto: string = "";
  cpf: string = "";
  telefone: string = "";
  nascimento: string = "";
  qrCode: string = "";


  mostrarCartao(){
    console.log("jooj");
    this.esconderCartao = false;
    this.esconderMetodos = true;
    this.esconderDescricao = true;
  }

  mostrarBoleto(){
    console.log("jooj");
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
  }

  comprarCredito(){
    
  }

  // validarCPF(){
  //   if()
  // }

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

    produtosArr.forEach((produto: { valor: string; }) => {
      var valorInt = parseFloat(produto.valor.replace('R$ ', '').replace(',', '.'))
      valorTotal += valorInt;
    });

    return valorTotal;
  }
}