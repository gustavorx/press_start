import { Component, NgModule, OnInit } from '@angular/core';
import axios from 'axios';
import { JogoModel } from '../Models/jogo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  jogos: JogoModel[] = [];
  jogosCarrosel: JogoModel[] = [];
  jogosMaisVendidos: JogoModel[] = [];

  constructor() { }

  ngOnInit() {
    axios.get("http://localhost:8080/jogos")
      .then((response) => {
        this.jogos = response.data
        this.jogosCarrosel = this.jogos.slice(0, 3)
        console.log(this.jogosCarrosel)
        this.jogosMaisVendidos = this.jogos.slice(3, 6)
        console.log(this.jogosMaisVendidos)
      })
      .catch((erro) => console.error(erro))
  }

}
