import { Component } from '@angular/core';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent {
  Nome: string = "Grand Theft Auto V"
  Preco: string = 19.00.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  Desenvolvedora: string = "Rockstar North";
  Distribuidora: string = "Rockstar Games";
  DataLancamento: string = new Date(2015, 4, 14).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  Descricao: string = "Quando um malandro de rua, um ladrão de bancos aposentado e um psicopata aterrorizante se veem encrencados, eles precisam realizar uma série de golpes ousados para sobreviver em uma cidade onde não podem confiar em ninguém, nem mesmo um no outro."
  Classificacao: number = 18;

  comprar() {
    console.log("comprando..")
  }

  adicionarAoCarrinho() {
    sessionStorage.setItem("carrinho", JSON.stringify({ "Nome": this.Nome, "Preco": this.Preco }))
    console.log("adicionando ao carrinho..")
  }
}
