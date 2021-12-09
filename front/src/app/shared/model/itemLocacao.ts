import {Locacao} from "./locacao";
import {Filme} from "./filme";

export interface itemLocacao {
  id: number;
  locacao: Locacao;
  filmes: Filme;
  quantidade: number;
  valoritem: number;
}
