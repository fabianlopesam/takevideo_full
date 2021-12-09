import { Component, OnInit } from '@angular/core';
import { Filme} from "../../shared/model/filme";
import { FilmesService} from "../../shared/services/filmes.service";
import {HttpParams} from "@angular/common/http";
import applyChanges from "devextreme/data/apply_changes";

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

  filmes: Filme[] = [];

  constructor(public _filmesService: FilmesService) {
  }

  async inserirFilmes(event: any) {

      const dialogResult = await confirm("confirma inclusão?");
      if (dialogResult) {
        console.log('I');
        await this._filmesService.postFilmes(event.data).toPromise();
        return event.cancel = false;

      } else {
        return true;
      }
  }

  async alterarFilmes(event: any){

    const dialogResult = await confirm("confirma alteração?");
    if (dialogResult) {
      console.log('U');
      event.data = Object.assign(event.key, event.data);
      await this._filmesService.putFilmes(event.data, event.key.id).toPromise();
      return event.cancel = false;
    } else {
      return true;
    }
  }

  async deletarFilmes(event: any){
    const dialogResult = await confirm("confirma remoção?");
    if (dialogResult) {
      console.log('D');
      await this._filmesService.deleteFilmes(event.key.id).toPromise();
      return event.cancel = false;
    } else {
      return true;
    }

  }

  ngOnInit(): void {
    this._filmesService.getFilmes().subscribe(dados => this.filmes = dados);
  }
}

