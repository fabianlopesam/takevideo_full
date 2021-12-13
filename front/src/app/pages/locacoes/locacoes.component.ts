import { Component, OnInit } from '@angular/core';
import { LocacoesService} from "../../shared/services/locacoes.service";
import { Locacao } from "../../shared/model/locacao"
import { ClienteService} from "../../shared/services/cliente.service";
import { Cliente} from "../../shared/model/cliente";
import {FilmesService} from "../../shared/services/filmes.service";
import {Filme} from "../../shared/model/filme";
import applyChanges from "devextreme/data/apply_changes";
import CustomStore from "devextreme/data/custom_store"

@Component({
  selector: 'app-locacoes',
  templateUrl: './locacoes.component.html',
  styleUrls: ['./locacoes.component.scss']
})
export class LocacoesComponent implements OnInit {

  locacoes: any;
  filmes = {};

  locacao: Locacao = new Locacao();
  cliente: Cliente = new Cliente();

  disableLocacoes: boolean = true;
  disableItens: boolean = true;
  disableBotoes: boolean = true;

  constructor(public _locacoesService: LocacoesService, public _filmesService: FilmesService) {

    this.filmes = {
      store: new CustomStore({
        key: "id",
        loadMode: "raw",
        load: () => {
          // Returns an array of objects that have the following structure:
          // { id: 1, name: "John Doe" }
          return this._filmesService.getFilmes()
            .toPromise();
        }
      }),
      sort: "nome"
    };

    // console.log(this.filmes);

  }

  ngOnInit(): void {

  }

  clienteChange(event: any) {
    this.disableLocacoes = false;
    this.disableItens = false;
    this.disableBotoes = false;
    this._locacoesService.getLocacoesPorCliente(event.id).subscribe(dados => this.locacoes = dados);
    //this.filmes = this._filmesService.getFilmes().subscribe(dados => this.filmes = dados);
  }

  salvarItensLocacao(itens: any){

    console.log('itens');
    console.log(itens);
    for (let change of itens.changes) {
        change.data.setValue(change.data.value);
    }

  }

  salvarLocacao(event: any) {

    event.cancel = true;
    console.log(event);

    console.log(1);
    event.promise = this.processSaving(event);
    console.log(6);

  }

  async processSaving(event: any) {

    for (let change of event.changes) {
      console.log(2);
      switch (change.type) {
        case 'insert':
          console.log('I');
          let novo = await this._locacoesService.postLocacoes(change.data).toPromise();
          this.locacoes = applyChanges(this.locacoes, [novo], { keyExpr: 'id' });
          break;
        case 'update':
          console.log('U');
          change.data = Object.assign(change.key, change.data);
          console.log(3);
          let dados = await this._locacoesService.putLocacoes(change.data, change.key.id).toPromise();
          console.log(4);
          this.locacoes = applyChanges(this.locacoes, [dados], { keyExpr: 'id' })
          console.log(5);
          break;
        case 'remove':
          console.log('D');
          await this._locacoesService.deleteLocacoes(change.key.id).toPromise();
          break;
        default:
          console.log(change.type);
          break;
      }
      console.log(2.1);
    }
    event.cancel = false;
  }

  iniciarGridItens(event: any){

    event.data.itens = {};
    //this.filmes = this._filmesService.getFilmes().subscribe(dados => this.filmes = dados);
    //console.log(this.filmes);
  }

}
