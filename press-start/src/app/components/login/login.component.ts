import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient, private route: Router) { }

  //Dados pessoais
  id: string = "";
  cpf: string = "";
  cpfOg: string = "";
  email: string = ""
  senha: string = "";

  //Alterar senha
  repitaSenha: string = "";

  //Alterar para tela de esquece a senha
  mostrarEsqueci = false;
  mostrarBotoes = false;
  msgErro = "";

  esqueci() {
    this.mostrarEsqueci = true;
    this.mostrarBotoes = true;
  }

  resetarSenha() {
    this.mostrarEsqueci = false;
    this.msgErro = ""
  }

  //Mostrar senha
  mostrarSenha = true;
  sPsw = "password";

  showPsw() {
    if (this.mostrarSenha == true) {
      this.mostrarSenha = false;
      this.sPsw = "text";
    } else if (this.mostrarSenha == false) {
      this.mostrarSenha = true;
      this.sPsw = "password";
    }
  }

  //Busca o usuario com o email e senha passadas
  fazerLogin() {
    let url: string = `http://localhost:8080/login/${this.email}/${this.senha}`;

    fetch(url)
      .then(data => { return data.json() })
      .then(res => {
        this.id = res._id;
        this.route.navigate(['/']);
      }).catch(msg => this.msgErro = "E-mail ou senha inválidos. Tente novamente");
  }

  //Atualiza a senha para o usuario com o CPF passado
  update(data: JSON) {
    let url: string = `http://localhost:8080/login/${this.cpf}`;

    fetch(url)
      .then(data => { return data.json() })
      .then(res => {
        this.cpfOg = res.cpf;

        //Verifica se o CPF passado e igual ao do banco
        if (this.cpf == this.cpfOg) {
          try {
            if (this.senha == this.repitaSenha) {
              this.http.put(`http://localhost:8080/login/${this.cpf}`, data, { responseType: 'text' }).subscribe();
              this.mostrarEsqueci = false;
              this.msgErro = ""
            }
            else if (this.senha != this.repitaSenha) {
              this.msgErro = "Senhas não confere. Tente novamente.";
            }
          } catch (error) {
            console.error(error);
          }
        }
      }).catch(msg => this.msgErro = "CPF inválido");
  }
}