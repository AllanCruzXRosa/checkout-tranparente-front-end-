import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";


import { ProdutoRoutingModule } from './produto.route';
import { ProdutoAppComponent } from './produto.app.component';
import { ProdutoService } from './services/produto.service';
import { ListaComponent } from './lista/lista.component';
import { ProdutoResolve } from './services/produto.resolve';


@NgModule({
  declarations: [
    ProdutoAppComponent,
    ListaComponent

  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,     
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule

  ],
  providers: [
    ProdutoService,
    ProdutoResolve
   
  ]
})
export class ProdutoModule { }
