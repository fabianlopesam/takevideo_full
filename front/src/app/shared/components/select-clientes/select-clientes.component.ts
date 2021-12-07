import {Component, enableProdMode, EventEmitter, Input, OnInit, Output} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-select-clientes',
  templateUrl: './select-clientes.component.html',
  styleUrls: ['./select-clientes.component.scss']
})
export class SelectClientesComponent implements OnInit {

  clientes: any;

  @Input() dadoscliente: any;

  @Output() dadosclienteOut: EventEmitter<any> = new EventEmitter();

  clienteselecionado(event: any) {

    this.dadoscliente = event.value;
    this.dadosclienteOut.emit(event.value);
  }

  constructor() {

    this.clientes = new DataSource({
      store: AspNetData.createStore({
        key: 'id',
        loadUrl: '',
      }),
      sort: 'id',
      group: 'id.id',
      paginate: true,
      pageSize: 1,
    });
  }

  ngOnInit(): void {
  }

}
