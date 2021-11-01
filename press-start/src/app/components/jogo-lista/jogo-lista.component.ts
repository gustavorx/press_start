import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { JogoModel } from '../Models/jogo.model';

@Component({
  selector: 'app-jogo-lista',
  templateUrl: './jogo-lista.component.html',
  styleUrls: ['./jogo-lista.component.css']
})
export class JogoListaComponent implements OnInit {
  jogos: JogoModel[] = [];

  constructor() { }

  ngOnInit() {
    axios.get("http://localhost:8080/jogos")
      .then((response) => {
        this.jogos = response.data
      })
      .catch((erro) => console.error(erro))
  }
}
