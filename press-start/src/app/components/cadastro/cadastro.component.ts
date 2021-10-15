import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent {

  esconderInputs = true;

  //Dados endereço
  cep: string = "";
  rua: string = "";
  numero: string = "";
  bairro: string = "";
  cidade: string = "";
  estado: string = "";
  complemento: string = "";


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
      alert("CEP deve conter 8 dígitos e não pode estar vazio")
    }
    else {
      alert("Digite apenas números no CEP!!!")
    }
  }
}
