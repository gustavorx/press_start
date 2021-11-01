import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})

export class JogoComponent {
  Id: number = 1
  Nome: string = "Grand Theft Auto V"
  Preco: string = 19.00.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  Desenvolvedora: string = "Rockstar North";
  Distribuidora: string = "Rockstar Games";
  DataLancamento: string = new Date(2015, 4, 14).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  Descricao: string = "Quando um malandro de rua, um ladrão de bancos aposentado e um psicopata aterrorizante se veem encrencados, eles precisam realizar uma série de golpes ousados para sobreviver em uma cidade onde não podem confiar em ninguém, nem mesmo um no outro."
  Classificacao: number = 18;
  Imagem: string = "/assets/images/gta-v-background.jpg";

  constructor(private toastr: ToastrService) {}

  comprar() {
    this.adicionarAoCarrinho(false);
    window.location.replace('/carrinho');
  }

  adicionarAoCarrinho(showToast = true) {
    var carrinho = localStorage.getItem('carrinho');

    var carrinhoArr = [];

    if (carrinho) {
      carrinhoArr = JSON.parse(carrinho);
    } else {
      carrinhoArr = [];
    }

    var existente = false;
    carrinhoArr.forEach((jogo: { id: number; }) => {
      if (jogo.id == this.Id) {
        existente = true;
      }
    });

    if (!existente) {
      carrinhoArr.push({id: this.Id, nome: this.Nome, valor: this.Preco, imagem: this.Imagem});
    }

    if (showToast) {
      this.toastr.success('Produto adicionado ao carrinho!');
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinhoArr)); 
  }
}
