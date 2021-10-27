import { Component } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})

export class PagamentoComponent {
    
  esconderDescricao = false;
  esconderCartao = true;
  esconderBoleto = true;
  esconderPix = true;
  esconderMetodos = false;

  mostrarCartao(){
    console.log("jooj");
    this.esconderCartao = false;
    this.esconderMetodos = true;
    this.esconderDescricao = true;
  }

  mostrarBoleto(){
    console.log("jooj");
    this.esconderBoleto = false;
    this.esconderMetodos = true;
    this.esconderDescricao = true;
  }

  mostrarPix(){
    this.esconderPix = false;
    this.esconderMetodos = true;
    this.esconderDescricao = true;
  }

  alterarPagameto(){
    this.esconderCartao = true;
    this.esconderBoleto = true;
    this.esconderPix = true;
    this.esconderMetodos = false;
    this.esconderDescricao = false;
  }
}