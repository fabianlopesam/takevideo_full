import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClientesService} from "../../shared/services/clientes.service";
import {Clientes} from "../../shared/models/clientes";
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
            let novo = await this._clienteService.postClientes(change.data).toPromise();
            this.clientes = applyChanges(this.clientes, [novo], { keyExpr: 'id' });
            break;
          case 'update':
            console.log('U');
            change.data = Object.assign(change.key, change.data);
            console.log(3);
            let dados = await this._clienteService.putClientes(change.data, change.key.id).toPromise();
            console.log(4);
            this.clientes = applyChanges(this.clientes, [dados], { keyExpr: 'id' })
            console.log(5);
            break;
          case 'remove':
            console.log('D');
              await this._clienteService.deleteClientes(change.key.id).toPromise();
              break;
          default:
            console.log(change.type);
            break;
      }
      console.log(2.1);
    }
    event.cancel = false;
    this.ngOnInit();
  }

  ngOnInit(): void {
    this._clienteService.getClientes().subscribe(dados => this.clientes = dados);
  }

}
