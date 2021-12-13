import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cliente} from "../model/cliente";
import {take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly clientesAPI = 'http://localhost:8080/clientes/';

  constructor(private http:HttpClient) { }

  getClientes() {
    return this.http.get<Cliente[]>(this.clientesAPI + 'todos');
      // .pipe( tap(console.log) )
  }

  postClientes(cliente: JSON ) {
    return this.http.post(this.clientesAPI + 'salvar', cliente);
  }

  putClientes(cliente: JSON, id:number ) {
    return this.http.put<Cliente>(this.clientesAPI + id, cliente);
  }

  deleteClientes(id:number){
    return this.http.delete(this.clientesAPI + id);
  }


}
