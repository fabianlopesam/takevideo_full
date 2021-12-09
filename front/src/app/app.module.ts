import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteService} from "./shared/services/cliente.service";
import {HttpClientModule} from "@angular/common/http";
import {DxButtonModule, DxDataGridModule, DxSelectBoxModule} from "devextreme-angular";
import { FilmesComponent } from './pages/filmes/filmes.component';
import { FilmesService} from "./shared/services/filmes.service";
import { SelectClientesComponent } from './shared/components/select-clientes/select-clientes.component';
import { SelectFilmesComponent } from './shared/components/select-filmes/select-filmes.component';
import { LocacoesComponent } from './pages/locacoes/locacoes.component';
import { LocacoesService} from "./shared/services/locacoes.service";
import { FirstKeyToConsolePipe } from './shared/first-key-to-console.pipe';
import {DxoItemModule} from "devextreme-angular/ui/nested";

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FilmesComponent,
    SelectClientesComponent,
    SelectFilmesComponent,
    LocacoesComponent,
    FirstKeyToConsolePipe
  ],
    imports: [
        BrowserModule,
        SideNavOuterToolbarModule,
        SideNavInnerToolbarModule,
        SingleCardModule,
        FooterModule,
        ResetPasswordFormModule,
        CreateAccountFormModule,
        ChangePasswordFormModule,
        LoginFormModule,
        UnauthenticatedContentModule,
        AppRoutingModule,
        HttpClientModule,
        DxDataGridModule,
        DxSelectBoxModule,
        DxButtonModule,
        DxoItemModule
    ],
  providers: [AuthService, ScreenService, AppInfoService, ClienteService, FilmesService, LocacoesService],
  exports: [
    ClientesComponent,
    FilmesComponent,
    LocacoesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
