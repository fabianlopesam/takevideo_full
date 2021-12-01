import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClientesService} from "../shared/services/clientes.service";
import {Clientes} from "../shared/models/clientes";
import DevExpress from "devextreme";
import applyChanges from 'devextreme/data/apply_changes'
import {BehaviorSubject} from "rxjs";
import dxDataGrid from "devextreme/ui/data_grid";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  @ViewChild('clientes_grid', {static:true})
  private cliente_grid = {} as DxDataGridComponent;

  private clientes$ = new BehaviorSubject<Clientes[]>([]);
  clientes: Clientes[] = [];

  constructor(public _clienteService: ClientesService) {
  }

  salvarCliente(event: any) {

    event.cancel = true;

    for (let change of event.changes) {
      event.promise = this.processSaving(change);
    }
  }

  async processSaving(change: any) {

    try {
            switch (change.type) {
              case 'insert':
                return this.insereCliente(change);
              case 'update':
                return this.updateCliente(change);
              case 'remove':
                return this.removeCliente(change);
              default: ;
                break;

            }
    } finally {

    }
  }

  atualizaGrid(change: any, data: any) {



    this.cliente_grid.instance.cancelEditData();
    this.ngOnInit();
    /*
    change.data = data;
    const cliente = applyChanges(this.clientes$.getValue(), [change], { keyExpr: 'id' });
    console.log(cliente);
    console.log(data);
    console.log(change);
    console.log(this.clientes$);
    this.clientes$.next(cliente);
    console.log(this.clientes$);*/
  }

  async insereCliente(change: any) {
    const data = await this._clienteService.postClientes(change.data).toPromise();
    this.atualizaGrid(change, data);
  }

  async updateCliente(change: any) {

    if (change.data.codigo != null) {
      change.key.codigo = change.data.codigo
    }
    if (change.data.nome != null) {
      change.key.nome = change.data.nome
    }
    const data = await this._clienteService.putClientes(change.key, change.key.id ).toPromise();
    this.atualizaGrid(change, data);
  }

  async removeCliente(change: any) {
    const data = await this._clienteService.deleteClientes(change.key.id).toPromise();
    this.atualizaGrid(change, data);
  }

  ngOnInit(): void {
    this._clienteService.getClientes().subscribe(dados => this.clientes = dados);
  }

}
