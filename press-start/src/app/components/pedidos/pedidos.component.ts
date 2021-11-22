import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { PedidoModel } from '../Models/pedido.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})

export class PedidosComponent implements OnInit {
  
  id: any;
  pedidos: PedidoModel[] = [];
  more: boolean = false;
  showMore: boolean = false;  

  ngOnInit() {
    this.id = localStorage.getItem('token');
    axios.get(`http://localhost:8080/Pedidos/${this.id}`)
      .then((response) => {
        this.pedidos = response.data
        this.checarNumeroDePedidos(response.data);
      })
      .catch((erro) => console.error(erro))
  }

  checarNumeroDePedidos(pedidos: any){
    if(pedidos.length >= 10){
      this.showMore = true;
    }
  }
}