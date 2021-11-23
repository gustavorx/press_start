import { Component, OnInit } from '@angular/core';
import { JogoModel } from '../Models/jogo.model';
import { JogoService } from '../services/jogo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adm-jogos',
  templateUrl: './adm-jogos.component.html',
  styleUrls: ['./adm-jogos.component.css']
})
export class AdmJogosComponent implements OnInit {
  Jogo: JogoModel | undefined;
  novoJogo: JogoModel | undefined;
  jogoSvc: JogoService;

  Id: string = "";
  nome: string = "";
  descricao: string = "";
  preco: number | undefined;
  desenvolvedora: string = "";
  distribuidora: string = "";
  dataLancamento: Date | undefined;
  classificacao: number = 18;
  imagemLink: string = "";
  youtubeId: string = "";

  dataLancamentoFormatado: string = "";
  precoFormatado: string = "";

  IdUsuario: string = "";

  constructor(private jogoService: JogoService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private route: Router) {
    this.jogoSvc = jogoService;
  }

  async ngOnInit(): Promise<void> {
    this.IdUsuario = localStorage.getItem('token') ?? "";

    if (this.IdUsuario != "") {
      let url: string = `http://localhost:8080/usuarios/${this.IdUsuario}`;

      const responseUsuario = await axios.get(url);

      if (responseUsuario.status == 200 && responseUsuario.data.tipo != "Comum") {
        this.Id = this.activatedRoute.snapshot.params.id;

        if (this.Id) {
          this.jogoSvc.buscarJogo(this.Id).then((jogos) => {
            this.Jogo = jogos;

            this.nome = this.Jogo?.nome ?? "";;
            this.descricao = this.Jogo?.descricao ?? "";;
            this.preco = this.Jogo?.preco;
            this.precoFormatado = this.Jogo?.preco?.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL'
            }) ?? "";
            this.desenvolvedora = this.Jogo?.desenvolvedora ?? "";;
            this.distribuidora = this.Jogo?.distribuidora ?? "";
            this.dataLancamento = this.Jogo?.dataLancamento;
            this.dataLancamentoFormatado = new Date(this.Jogo?.dataLancamento.toString() ?? "").toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            this.classificacao = this.Jogo?.classificacao ?? 18;;
            this.imagemLink = this.Jogo?.imagemLink ?? "";;
            this.youtubeId = this.Jogo?.youtubeId != null ? `https://www.youtube.com/watch?v=${this.Jogo?.youtubeId}` : "";
          });
        }
      } else {
        this.route.navigate([""]);
      }
    } else {
      this.route.navigate([""]);
    }
  }

  async salvar() {
    try {
      const idYoutubeSemAUrlBase = this.youtubeId.replace("https://www.youtube.com/watch?v=", "")

      let data = this.dataLancamentoFormatado.split('/');
      let dataString: string = `${data[2]}-${data[1]}-${data[0]}T10:00:00.000Z`;

      let preco = parseFloat(this.precoFormatado.replace("R$", "").replace(".", "").replace(",", "."));

      this.novoJogo = new JogoModel(this.Id ?? null, this.nome, this.descricao, preco, this.desenvolvedora, this.distribuidora, dataString, this.classificacao, this.imagemLink, idYoutubeSemAUrlBase)
      if (this.Id) {
        //atualiza um jogo
        const response = await axios.put(`http://localhost:8080/jogos/${this.Id}`, this.novoJogo);

        if (response.status == 200) {
          window.location.href = `/jogos/${this.Id}`;
        } else {
          this.toastr.error('Nao foi possível atualizar o jogo.');
        }
      } else {
        //adiciona um jogo
        const response = await axios.post(`http://localhost:8080/jogos`, this.novoJogo);

        if (response.status == 201) {
          window.location.href = `/jogos/${response.data.Id}`;
        } else {
          this.toastr.error('Nao foi possível criar o jogo.');
        }
      }
    } catch (error) {
      console.error(error)
      this.toastr.error('Ocorreu um erro.');
    }
  }

  abrirImagem() {
    window.open(this.imagemLink, '_blank')?.focus();
  }

  abrirTrailer() {
    window.open(this.youtubeId, '_blank')?.focus();
  }
}
