
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resumoPedido',
  templateUrl: './resumoPedido.component.html',
  styleUrls: ['./resumoPedido.component.css']
})

export class ResumoPedidoComponent {
  
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