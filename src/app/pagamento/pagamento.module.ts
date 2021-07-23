import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";


import { PagamentoRoutingModule } from './pagamento.route';
import { PagamentoAppComponent } from './pagamento.app.component';
import { PagamentoService } from './services/pagamento.service';
import { NovoComponent } from './novo/novo.component';
import { VariableGlobal } from '../services/variable.global.service';
import { ListaComponent } from './lista/lista.component';


@NgModule({
  declarations: [
    PagamentoAppComponent,
    NovoComponent,
    ListaComponent

  ],
  imports: [
    CommonModule,
    PagamentoRoutingModule,     
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule

  ],
  providers: [
    PagamentoService,
    VariableGlobal
   
  ]
})
export class PagamentoModule { }
