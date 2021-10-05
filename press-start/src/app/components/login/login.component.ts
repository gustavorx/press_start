import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  titulo = "Fazer login";
  mostrarEsqueci = false;
  mostrarBotoes = false;
  msgErro = "";

  esqueci() {
    this.mostrarEsqueci = true;
    this.mostrarBotoes = true;
    this.titulo = "Esqueci minha senha"
  }

  fazerLogin() {
  }

  resetarSenha() {
    this.titulo = "Fazer login"
  }
}
