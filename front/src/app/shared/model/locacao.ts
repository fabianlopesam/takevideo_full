import {itemLocacao} from "./itemLocacao";
import {Cliente} from "./cliente";

export  class Locacao {
  id!: number;
  cliente!: Cliente;
  datalocacao!: Date;
  datadevolucao!: Date;
  itens!: Array<itemLocacao>;
}
