import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';


import { Transacao } from '../models/transacao';
import { PagamentoService } from '../services/pagamento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public transacoes: Transacao[];
  errorMessage: string;

  constructor(private pagamentoService: PagamentoService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    /** spinner starts on init */
    this.spinner.show();


    this.pagamentoService.listarTransacoes()
      .subscribe(
        transacoes => this.transacoes = transacoes,
        erro => this.errorMessage);


    

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

}
