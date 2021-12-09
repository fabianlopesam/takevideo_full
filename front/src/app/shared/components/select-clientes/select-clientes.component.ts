import {Component, enableProdMode, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClienteService} from "../../services/cliente.service";

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

  @Output() dadosclienteChange: EventEmitter<any> = new EventEmitter();

  clienteselecionado(event: any) {

    this.dadoscliente = event.value;
    this.dadosclienteChange.emit(event.value);
  }

  constructor( public _clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this._clienteService.getClientes().subscribe(dados => this.clientes = dados);
  }

}
