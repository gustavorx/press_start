import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import axios, { Axios } from 'axios';

@Component({
  selector: 'app-alterar-cadastro',
  templateUrl: './alterar-cadastro.component.html',
  styleUrls: ['./alterar-cadastro.component.css']
})
export class AlterarCadastroComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private authService: AuthService) { }

  //Busca dados do Usuario
  ngOnInit(): void {
    //pega Id do usuario ao fazer login
    this.id = localStorage.getItem('token');

    let url: string = `http://localhost:8080/usuarios/${this.id}`;

    fetch(url)
      .then(data => { return data.json() })
      .then(res => {
        this.nome = res.nome;
        this.cpf = res.cpf;
        this.telefone = res.telefone;
        this.dtNasc = res.dtNasc;
        this.sexo = res.sexo;
        this.email = res.email;
        this.senhaOg = res.senha;
        this.tipo = res.tipo;
        if (this.tipo == "Administrador master") {
          this.mostraTipo = true;
        }
        this.cep = res.cep;
        this.numero = res.numero;
        this.rua = res.rua;
        this.bairro = res.bairro;
        this.cidade = res.cidade;
        this.estado = res.estado;
        this.complemento = res.complemento;
      }).catch(error => console.error(error));
  }

  //Dados pessoais
  id: any = "";
  nome: string = "...";
  cpf: string = "...";
  telefone: string = "...";
  dtNasc: string = "...";
  sexo: string = "...";
  email: string = "...";

  //Tipo de usuario
  tipo: string = "";
  mostraTipo = false;

  //Alterar senha
  senhaOg: string = "";
  senhaAntiga: string = "";
  novaSenha: string = "";
  repitaSenha: string = "";

  //Dados endereço
  cep: string = "...";
  rua: string = "...";
  numero: string = "...";
  bairro: string = "...";
  cidade: string = "...";
  estado: string = "...";
  complemento: string = "...";

  //Muda para tela de alterar senha
  alterarSenhas = false;

  alterarSenha() {
    if (this.alterarSenhas == false) {
      this.alterarSenhas = true
      this.alerta = ""
    } else if (this.alterarSenhas == true) {
      this.alterarSenhas = false;
      this.alerta = ""
    }
  }

  //Mostrar alerta
  alerta = "";
  aviso = "warning";

  //Mostra a senha
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

  //Atualiza no banco
  async update(data: JSON) {

    if (this.senhaOg == this.senhaAntiga && this.novaSenha == this.repitaSenha) {
      const response = await axios.put(`http://localhost:8080/usuarios/${this.id}`, data);
      this.aviso = "success";
      this.alerta = "Senha alterado com sucesso";
      window.location.href = "/alterar-cadastro";
    }
    else if (this.alterarSenhas == false) {
      const response = await axios.put(`http://localhost:8080/usuarios/${this.id}`, data);
      this.aviso = "success";
      this.alerta = "Informações atualizadas com sucesso";
      window.location.href = "/alterar-cadastro";
    }
    else if (this.senhaAntiga.length <= 7 || this.novaSenha.length <= 7 || this.repitaSenha.length <= 7) {
      this.aviso = "warning";
      this.alerta = "Senhas não pode ser vazia e deve conter no mínimo 8 caracteres"
    }
    else if (this.senhaOg != this.senhaAntiga) {
      this.aviso = "warning";
      this.alerta = "Senhas antiga errada. Tente novamente."
    }
    else if (this.novaSenha != this.repitaSenha) {
      this.aviso = "warning";
      this.alerta = "Senha nova diferentes. Tente novamente."
    }
  }

  //Pesquisa o CEP fornecido
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
      this.alerta = "CEP deve conter 8 dígitos e não pode estar vazio"
    }
    else {
      this.alerta = "Digite apenas números no CEP!!!"
    }
  }
}