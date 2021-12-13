import {Locacao} from "./locacao";
import {Filme} from "./filme";

export interface ItemLocacao {
  id: number;
  locacao: Locacao;
  filme: Filme;
  quantidade: number;
  valoritem: number;
}
