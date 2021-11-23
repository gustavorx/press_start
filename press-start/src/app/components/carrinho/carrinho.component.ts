import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JogoModel } from '../Models/jogo.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})

export class CarrinhoComponent implements OnInit {
  
  constructor(private toastr: ToastrService) {}
  
  existemProdutos: boolean = false;

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos() {
    var carrinho = localStorage.getItem('carrinho');

    var carrinhoArr = [];
    if (carrinho) {
      carrinhoArr = JSON.parse(carrinho);
    } else {
      carrinhoArr = [];
    }

    if(carrinho?.includes("id")){
      this.existemProdutos = true;
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
    console.log(novoCarrinho);
    
    if(novoCarrinho.length == 0){
      this.existemProdutos = false;
    }
  }
}
