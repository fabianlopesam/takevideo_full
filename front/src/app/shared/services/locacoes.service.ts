import { Injectable } from '@angular/core';
import {Cliente} from "../model/cliente";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Locacao} from "../model/locacao";

@Injectable({
  providedIn: 'root'
})
export class LocacoesService {

  private readonly locacoesAPI = 'http://localhost:8080/locacoes/';

  constructor(private http: HttpClient ) { }

  getTodasLocacoes() {
    return this.http.get<Locacao>(this.locacoesAPI + 'todos')
      .pipe( tap(console.log) )
  }

  getLocacaoById(id: number) {
    return this.http.get<Locacao>(this.locacoesAPI + id)
      .pipe( tap(console.log) )
  }

  getLocacoesPorCliente(idCliente: number) {
    return this.http.get<Locacao[]>(this.locacoesAPI + 'cliente/'+idCliente)
      .pipe( tap(console.log) )
  }

  postLocacoes(cliente: JSON ) {
    return this.http.post(this.locacoesAPI + 'salvar', cliente);
  }

  putLocacoes(cliente: JSON, id:number ) {
    return this.http.put<Cliente>(this.locacoesAPI + id, cliente);
  }

  deleteLocacoes(id:number){
    return this.http.delete(this.locacoesAPI + id);
  }

}
