
import { Component } from '@angular/core';

@Component({
  selector: 'app-resumoPedidoCartao',
  templateUrl: './resumoPedidoCartao.component.html',
  styleUrls: ['./resumoPedidoCartao.component.css']
})

export class ResumoPedidoComponentCartao {
  
  parcelas: number[] = [1, 2, 3];
  
  parcelaSelecionada: number = 1;
  
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