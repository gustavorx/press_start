import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('token');

    let url: string = `http://localhost:8080/usuarios/${this.id}`;

    fetch(url)
      .then(data => { return data.json() })
      .then(res => {
        this.tipo = res.tipo;
        if (this.tipo != "Administrador master") {
          this.route.navigate(['/']);
        }
      }).catch(error => console.error(error));
  }

  //Dados pessoais
  id: any = "";
  nome: string = "";
  cpf: string = "";
  cpfOg: string = "";
  telefone: string = "";
  dtNasc: string = "";
  sexo: string = "";
  email: string = ""

  //Tipo de usuario
  tipo: string = "";

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
  aviso = "warning";

  //mostrar
  mostrarUser = false;

  // pega o CPF e Carrega dados do usuario
  pesquisarUser(data: JSON) {
    let url: string = `http://localhost:8080/login/${this.cpf}`;

    fetch(url)
      .then(data => { return data.json() })
      .then(res => {
        this.cpfOg = res.cpf;

        //Verifica se o CPF passado e igual ao do banco
        if (this.cpf == this.cpfOg) {
          this.nome = res.nome;
          this.cpf = res.cpf;
          this.telefone = res.telefone;
          this.dtNasc = res.dtNasc;
          this.sexo = res.sexo;
          this.email = res.email;
          this.tipo = res.tipo;
          this.cep = res.cep;
          this.numero = res.numero;
          this.rua = res.rua;
          this.bairro = res.bairro;
          this.cidade = res.cidade;
          this.estado = res.estado;
          this.complemento = res.complemento;
          this.mostrarUser = true;
          this.alerta = ""
        }
      }).catch(msg => this.alerta = "CPF inválido");
  }

  //Insere no banco
  salvar(data: JSON) {
    this.http.put(`http://localhost:8080/login/${this.cpf}`, data, { responseType: 'text' }).subscribe();
    this.aviso = "success";
    this.alerta = "Usuário atualizado"
  }
}