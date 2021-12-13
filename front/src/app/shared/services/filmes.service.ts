import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Filme} from "../model/filme";
import {take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private readonly filmesAPI = 'http://localhost:8080/filmes/';

  constructor(private http:HttpClient) { }

  getFilmes() {
    return this.http.get<Filme[]>(this.filmesAPI + 'todos');
      // .pipe( tap(console.log) )
  }

  postFilmes(filmes: JSON ) {
    return this.http.post(this.filmesAPI + 'salvar', filmes);
  }

  putFilmes(filmes: JSON, id:number ) {
    return this.http.put<Filme>(this.filmesAPI + id, filmes);
  }

  deleteFilmes(id:number){
    return this.http.delete(this.filmesAPI + id);
  }


}
