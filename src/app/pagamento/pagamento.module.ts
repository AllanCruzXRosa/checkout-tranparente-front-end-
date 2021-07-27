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
import { ProdutoResolve } from '../produto/services/produto.resolve';
import { ProdutoService } from '../produto/services/produto.service';


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
    VariableGlobal,
    ProdutoResolve,
    ProdutoService
   
  ]
})
export class PagamentoModule { }
