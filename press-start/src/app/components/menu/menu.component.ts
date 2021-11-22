import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard'
import axios from "axios";
import { JogoModel } from "../Models/jogo.model"

@Component({
  selector: "app-menu",
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  logado: boolean = false;
  nomeUsuario: string = "";
  nomeJogoPesquisado: string = "";
  jogos: JogoModel[] = [];
  tipoAdm: string = "";

  constructor(private router: Router, private authService: AuthService, private auth: AuthGuard) {
    this.logado = auth.isLoggedIn();
    if (this.logado) {
      const idUsuario: string = localStorage.getItem("token") ?? "";
      axios.get(`http://localhost:8080/usuarios/${idUsuario}`)
        .then((response) => {
          this.nomeUsuario = response.data.nome;
          this.tipoAdm = response.data.tipo;
        })
        .catch((error) => console.error(error))
    }
  }

  //Faz o logout do usuário e redireciona para a home
  logout() {
    this.authService.logout();
    window.location.href = "/";
  }

  buscarJogosPeloNome() {
    if (this.nomeJogoPesquisado == "") this.jogos = [];

    axios.get(`http://localhost:8080/jogos/find/${this.nomeJogoPesquisado}`)
      .then((response) => {
        this.jogos = response.data;
      })
  }
}