import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css']
})

export class BoletoComponent implements OnInit {
  
  esconderImprimir: boolean = false;
  codigo: string = "";
  cpf: string = "";
  nomeCompleto: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gerarCodigoPix();
    this.cpf = this.route.snapshot.paramMap.get('cpf') ?? "";
    this.nomeCompleto = this.route.snapshot.paramMap.get('nomeCompleto') ?? "";
    let teste = document.getElementById("header-menu");
    if(teste != null){
      teste.style.display='none';
    }
  }

  ngOnDestroy(): void {
    let teste = document.getElementById("header-menu");
    if(teste != null){
      teste.style.display='flex';
    }
  }


  imprimir(){
      setTimeout(function(){ 
        window.print();
       }, 3000);  
  }

  gerarCodigoPix(){
    var part1: string = this.stringAleatoria(5, '0123456789');
    var part2: string = this.stringAleatoria(5, '0123456789');
    var part3: string = this.stringAleatoria(5, '0123456789');
    var part4: string = this.stringAleatoria(6, '0123456789');
    var part5: string = this.stringAleatoria(5, '0123456789');
    var part6: string = this.stringAleatoria(6, '0123456789');
    var part7: string = this.stringAleatoria(1, '0123456789');
    var part8: string = this.stringAleatoria(15, '0123456789');

    this.codigo = part1 + "." + part2 + "." + part3 + "." + part4 + " " + part5 + "." + part6 + " " + part7 + " " + part8;
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

    produtosArr.forEach((produto: { preco: number; }) => {
      var valorInt = produto.preco
      valorTotal += valorInt;
    });

    return valorTotal;
  }
}