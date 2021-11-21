import axios, { AxiosResponse } from "axios"
import { JogoModel } from "../Models/jogo.model"

export class JogoService {
    Endpoint: string = "http://localhost:8080/jogos";

    async buscarTodosJogos(): Promise<JogoModel[]> {
        let jogos: JogoModel[] = [];
        await axios.get(`${this.Endpoint}`)
            .then((response) => {
                jogos = response.data
            })
            .catch((erro) => console.error(erro))
        return jogos;
    }

    async buscarJogo(id: string): Promise<JogoModel | undefined> {
        let jogo: JogoModel | undefined = undefined;
        await axios.get(`${this.Endpoint}/${id}`)
            .then((response) => {
                jogo = response.data;
            })
            .catch((error: string) => {
                throw new Error("Erro ao buscar jogo " + id + " => " + error)
            })
        return jogo;
    }
}