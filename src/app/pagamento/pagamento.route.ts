
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoResolve } from '../produto/services/produto.resolve';

import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { PagamentoAppComponent } from './pagamento.app.component';


const pagamentoRouterConfig: Routes = [
    {
        path: '', component: PagamentoAppComponent,
        children: [
            { path: 'novo/:id', component: NovoComponent ,

            resolve: {
                produto: ProdutoResolve
            }

             },
            { path: 'listar-todos', component: ListaComponent },
           
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(pagamentoRouterConfig)
    ],
    exports: [RouterModule]
})
export class PagamentoRoutingModule { }
