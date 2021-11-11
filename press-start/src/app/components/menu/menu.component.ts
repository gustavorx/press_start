import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard'
import axios from "axios";

@Component({
  selector: "app-menu",
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  logado: boolean = false;
  nomeUsuario: string = "";

  constructor(private router: Router, private authService: AuthService, private auth: AuthGuard) {
    this.logado = auth.isLoggedIn();
    if (this.logado) {
      const idUsuario: string = localStorage.getItem("token") ?? "";
      axios.get(`http://localhost:8080/usuarios/${idUsuario}`)
        .then((response) => {
          this.nomeUsuario = response.data.nome;
        })
        .catch((error) => console.error(error))
    }
  }

  //Faz o logout do usuário e redireciona para a home
  logout() {
    this.authService.logout();
    window.location.href = "/";
  }
}