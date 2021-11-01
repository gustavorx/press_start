import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})

export class CarrinhoComponent {
  constructor(private toastr: ToastrService) {}

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

  removerProduto(id: number) {
    var carrinho = localStorage.getItem('carrinho');

    var carrinhoArr = [];

    if (carrinho) {
      carrinhoArr = JSON.parse(carrinho);
    } else {
      carrinhoArr = [];
    }

    var novoCarrinho: { id: number; }[] = [];
    carrinhoArr.forEach((jogo: { id: number; }) => {
      if (jogo.id != id) {
        novoCarrinho.push(jogo)
      }
    });

    this.toastr.success('Produto removido do carrinho!');

    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho)); 
  }
}
