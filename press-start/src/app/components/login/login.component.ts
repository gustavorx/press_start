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
  mostrarSenha = true;
  sPsw = "password";

  esqueci() {
    this.mostrarEsqueci = true;
    this.mostrarBotoes = true;
  }

  fazerLogin() {
  }

  resetarSenha() {
    this.mostrarEsqueci = false;
  }

  //Mostra a senha
  showPsw(){
    if (this.mostrarSenha == true) {
      this.mostrarSenha = false;
      this.sPsw = "text";
    }else if (this.mostrarSenha == false) {
      this.mostrarSenha = true;
      this.sPsw = "password";
    }
  }
}
