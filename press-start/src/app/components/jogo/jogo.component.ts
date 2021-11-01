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
  carrinhoSession: string = "carrinho";
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
    let carrinhoString = sessionStorage.getItem(this.carrinhoSession);

    if (carrinhoString != null) {
      let carrinho = JSON.parse(carrinhoString);
      carrinho.push(this.Jogo);
      sessionStorage.setItem(this.carrinhoSession, JSON.stringify(carrinho));
    } else {
      sessionStorage.setItem(this.carrinhoSession, JSON.stringify([this.Jogo]));
    }
    // location.replace("http://localhost:4200/jogos"); // TODO redirecionar para o carrinho
  }
}
