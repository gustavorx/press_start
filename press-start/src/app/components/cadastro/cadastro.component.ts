import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

  subscription: Subscription = new Subscription;

  constructor(private http: HttpClient, private route: Router, private idUser: LoginService) { }

  ngOnInit(): void {
    //pega Id do usuario ao fazer login
    this.subscription = this.idUser.idAtual.subscribe(message => this.id = message);

    let url: string = `http://localhost:8080/usuarios/${this.id}`;

    fetch(url)
      .then(data => { return data.json() })
      .then(res => {
        if(res.tipo == "Administrador master"){
          this.mostraTipo = true;
        }
      }).catch(error => console.error(error));
  }
  
  //Dados pessoais
  id: string = "";
  nome: string = "";
  cpf: string = "";
  telefone: string = "";
  dtNasc: string = "";
  sexo: string = "Prefiro não informar";
  email: string = ""
  senha: string = "";

  //Tipo de usuario
  tipo: string = "Comum";
  mostraTipo = false;
  
  //Dados endereço
  cep: string = "";
  rua: string = "";
  numero: string = "";
  bairro: string = "";
  cidade: string = "";
  estado: string = "";
  complemento: string = "";

  //Mostrar alerta
  alerta = "";
  
  //Mostra a senha
  mostrarSenha = true;
  sPsw = "password";

  showPsw(){
    if (this.mostrarSenha == true) {
      this.mostrarSenha = false;
      this.sPsw = "text";
    }else if (this.mostrarSenha == false) {
      this.mostrarSenha = true;
      this.sPsw = "password";
    }
  }

  //Insere no banco
  cadastrar(data: JSON) {
    this.http.post("http://localhost:8080/usuarios", data, { responseType: 'text' }).subscribe();
    this.route.navigate(['/login']); // Redireciona para a página de login após cadastro
  }

  //Busca CEP
  pesquisaCep() {

    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(this.cep)) {
      this.rua = "...";
      this.bairro = "...";
      this.cidade = "...";
      this.estado = "...";

      let url: string = `https://viacep.com.br/ws/${this.cep}/json/`;

      fetch(url)
        .then(data => { return data.json() })
        .then(res => {
          this.rua = res.logradouro;
          this.bairro = res.bairro;
          this.cidade = res.localidade;
          this.estado = res.uf;
        }).catch(error => console.error(error))

    } else if (this.cep.length <= 7) {
      this.alerta = "CEP deve conter 8 dígitos e não pode estar vazio";
    }
    else {
      this.alerta = "Digite apenas números no CEP!!!";
    }
  }
}