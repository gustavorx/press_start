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

  mostrarEsqueci = false;
  mostrarBotoes = false;
  msgErro = "";

  esqueci() {
    this.mostrarEsqueci = true;
    this.mostrarBotoes = true;
  }

  fazerLogin() {
  }

  resetarSenha() {
    this.mostrarEsqueci = false;
  }
}
