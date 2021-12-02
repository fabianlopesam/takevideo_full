import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClientesService} from "../shared/services/clientes.service";
import {Clientes} from "../shared/models/clientes";
import DevExpress from "devextreme";
import applyChanges from 'devextreme/data/apply_changes'
import {BehaviorSubject} from "rxjs";
import dxDataGrid from "devextreme/ui/data_grid";
import {DxDataGridComponent} from "devextreme-angular";
import {map} from "rxjs/operators";

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

    //console.log(change.data);
    //console.log(change.key);

    /*
    let dados = Object.entries(change.data);
    let chaves = Object.entries(change.key);

    for (var i = 0; i < dados.length; i++){
      for (var j = 0; j < chaves.length; j++) {
        if (dados[i][0] == chaves[j][0]) {
          //console.log(dados[i][0])
          //console.log(chaves[j][0])
          chaves[j][1] = dados[i][1];
          break;
        }
      }
    }
    for (var j = 0; j < chaves.length; j++) {
      console.log(chaves[j])
    }

    for (let campodata in change.data){
      console.log(campodata);
      for (let campokey in change.key ){
        if (campodata == campokey){
          console.log('achei no key');
          console.log(Object.entries(change.data))
          console.log(Object.entries(change.key))
        }
      }
      /*if (change.data.$campo.has){
        change.key.$campo = change.data.$campo;
      }

    }*/

    if (change.data.codigo != null) {
      change.key.codigo = change.data.codigo
    }
    if (change.data.nome != null) {
      change.key.nome = change.data.nome
    }

    //change.key.value = JSON.stringify(chaves);
    //console.log(change.key);

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
