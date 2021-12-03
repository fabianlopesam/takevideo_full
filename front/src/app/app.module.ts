import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClientesService} from "./shared/services/clientes.service";
import {HttpClientModule} from "@angular/common/http";
import {DxDataGridModule} from "devextreme-angular";
import { FilmesComponent } from './pages/filmes/filmes.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FilmesComponent
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
    DxDataGridModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, ClientesService],
  exports: [
    ClientesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
