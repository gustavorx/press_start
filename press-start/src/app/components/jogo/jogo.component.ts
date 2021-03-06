import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { JogoModel } from '../Models/jogo.model';


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})

export class JogoComponent implements OnInit {
  Id: string = "";
  carrinhoSession: string = "carrinho";
  Jogo?: JogoModel;
  adm: boolean = false;

  constructor(private toastr: ToastrService, private route: ActivatedRoute) { }

  comprar() {
    this.adicionarAoCarrinho(false);
    window.location.replace('/carrinho');
  }

  adicionarAoCarrinho(showToast = true) {
    var carrinho = localStorage.getItem('carrinho');

    var carrinhoArr = [];

    if (carrinho) {
      carrinhoArr = JSON.parse(carrinho);
    } else {
      carrinhoArr = [];
    }

    var existente = false;
    carrinhoArr.forEach((jogo: { id: string; }) => {
      if (jogo.id == this.Id) {
        existente = true;
      }
    });

    if (!existente) {
      carrinhoArr.push({ id: this.Jogo?._id, nome: this.Jogo?.nome, preco: this.Jogo?.preco, imagemLink: this.Jogo?.imagemLink });
    }

    if (showToast) {
      this.toastr.success('Produto adicionado ao carrinho!');
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinhoArr));
  }

  ngOnInit(): void {
    const idUsuario: string = localStorage.getItem("token") ?? "";
    if (idUsuario != "") {
      axios.get(`http://localhost:8080/usuarios/${idUsuario}`)
        .then((response) => {
          response.data.tipo != "Comum" ? this.adm = true : this.adm = false;;
        })
        .catch((error) => console.error(error))
    }

    this.Id = this.route.snapshot.paramMap.get('id') ?? "";

    axios.get(`http://localhost:8080/jogos/${this.Id}`)
      .then((response: { data: any; }) => {
        let jogo = response.data;
        this.Jogo = new JogoModel(jogo._id, jogo.nome, jogo.descricao, jogo.preco, jogo.desenvolvedora, jogo.distribuidora, jogo.dataLancamento, jogo.classificacao, jogo.imagemLink, jogo.youtubeId);
      })
      .catch((error: string) => {
        throw new Error("Erro ao buscar jogo " + this.Id + " => " + error)
      })
  }

  async deletarJogo() {
    const response = await axios.delete(`http://localhost:8080/jogos/${this.Id}`);

    if (response.status == 202) {
      window.location.href = "/jogos";
    } else {
      this.toastr.error('Nao foi poss??vel deletar o jogo.');
    }
  }
}
