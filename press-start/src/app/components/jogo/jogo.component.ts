import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { JogoModel } from '../Models/jogo.model';


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  Id: string = "";
  Nome: string = "Grand Theft Auto V";
  Preco: number = 19.00;
  Desenvolvedora: string = "Rockstar North";
  Distribuidora: string = "Rockstar Games";
  DataLancamento: Date = new Date(2015, 4, 14);
  Descricao: string = "Quando um malandro de rua, um ladrão de bancos aposentado e um psicopata aterrorizante se veem encrencados, eles precisam realizar uma série de golpes ousados para sobreviver em uma cidade onde não podem confiar em ninguém, nem mesmo um no outro."
  Classificacao: number = 18;

  Jogo?: JogoModel;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id') ?? "";

    axios.get(`http://localhost:8080/jogos/${this.Id}`)
      .then((response) => {
        let jogo = response.data;
        this.Jogo = new JogoModel(jogo._id, jogo.nome, jogo.descricao, jogo.preco, jogo.desenvolvedora, jogo.distribuidora, jogo.lancamento, jogo.classificacao, jogo.imagemLink);
      })
      .catch((error) => {
        throw new Error("Erro ao buscar jogo " + this.Id + " => " + error)
      })
  }

  verTrailer() {
    // TODO implementar trailer
  }

  adicionarAoCarrinho() {
    sessionStorage.setItem("carrinho", JSON.stringify(this.Jogo));
    location.replace("http://localhost:4200/jogos"); // TODO redirecionar para o carrinho
  }
}
