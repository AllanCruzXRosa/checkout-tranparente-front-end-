import { Component, OnInit } from '@angular/core';

import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public produtos: Produto[];
  errorMessage: string;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {


    this.produtoService.listarProdutos()
      .subscribe(
        produtos => this.produtos = produtos
        
        
        ,
        erro => this.errorMessage);   

   
  }

}
