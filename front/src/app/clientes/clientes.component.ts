import {Component, OnInit} from '@angular/core';
import {ClientesService} from "../shared/services/clientes.service";
import {Clientes} from "../shared/models/clientes";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Clientes[] = [];

  constructor(public _clienteService: ClientesService) { }

  salvarCliente(event: any) {
    let result ;
    event.cancel = "true";

    for (let change in event.changes) {
        switch (event.changes[change].type) {
          case 'insert':
              result = this._clienteService.postClientes(event.changes[change].data);
              break;
          case 'update':
              /*console.log(JSON.stringify(event.changes.map((change) => ({
                type: change.type,
                key: change.type !== 'insert' ? change.key : undefined,
                data: change.data,
              })), null, ' ');)*/
              if (event.changes[change].data.codigo != null) {event.changes[change].key.codigo = event.changes[change].data.codigo }
              if (event.changes[change].data.nome != null) {event.changes[change].key.nome = event.changes[change].data.nome }
              result = this._clienteService.putClientes(event.changes[change].key, event.changes[change].key.id );
              //console.log(result);
              break;
          case 'remove':
              result = this._clienteService.deleteClientes(event.changes[change].key.id);
              break;
          default: console.log(event.changes);
              break;

        }

    }
    //debugger
  }

  ngOnInit(): void {
    this._clienteService.getClientes().subscribe(dados=> this.clientes = dados);
  }

}
