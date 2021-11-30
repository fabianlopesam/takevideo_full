import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Clientes} from "../models/clientes";
import {take, tap} from "rxjs/operators";
import {pipe} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly clientesAPI = 'http://localhost:8080/clientes/';

  constructor(private http:HttpClient) { }

  getClientes() {
    return this.http.get<Clientes[]>(this.clientesAPI + 'todos')
      .pipe( tap(console.log) )
  }



  postClientes(cliente: JSON ) {
    return this.http.post(this.clientesAPI + 'salvar', cliente);
  }

  putClientes(cliente: JSON, id:number ) {
    return this.processBatchRequestPut(cliente, id);
  }

  async processBatchRequestPut(cliente: JSON, id:number ) {
    await this.http.put(this.clientesAPI + id, cliente, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).toPromise();
    pipe(take(1), tap(console.log));
  }

  async deleteClientes(id:number){
    await this.http.delete(this.clientesAPI + id, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).toPromise();
    pipe(take(1), tap(console.log));
  }


}
