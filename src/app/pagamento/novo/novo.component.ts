import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { PagamentoService } from '../services/pagamento.service';
import { Dados } from '../models/dados';
import { VariableGlobal } from 'src/app/services/variable.global.service';
import { Pagamento } from '../models/pagamento';
import { Parcela } from '../models/parcela';
import { Transacao } from '../models/transacao';
import { Produto } from 'src/app/produto/models/produto';
import { ConstantesUtils } from 'src/app/utils/contantes-utils';

declare var PagSeguroDirectPayment: any;

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent {
 
  public dados = new Dados();
  public pagamento = new Pagamento();
  public parcelas: Array<Parcela> = [];
  public parcelaObj: Parcela;
  public valorTotal: string;
  public valorFrete: string;
  public produto = new Produto();
  month = null;

  hashCode: any;

  constructor(private fb: FormBuilder,
    private pagamentoService: PagamentoService,
    private variableGlobal: VariableGlobal,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.produto = this.route.snapshot.data['produto'];
    console.log(this.produto );
    this.carregaJavascriptPagseguro();
  }

  //CARREGA O JAVASCRIPT DO PAGSEGURO (A EXPLICAÇÃO ESTA FUNÇÃO ESTÁ LOGO ABAIXO)
  carregaJavascriptPagseguro() {

    if (!this.variableGlobal.getStatusScript()) {
      //COLOCA O JAVASCRIPT NO CABEÇÁRIO DA PÁGINA
      new Promise<void>((resolve) => {
        let script: HTMLScriptElement = document.createElement('script');
        script.addEventListener('load', r => resolve());
        script.src = ConstantesUtils.JS_PAGSEGURO;
        document.head.appendChild(script);

      });

      this.setProduto();
      this.setFrete();

      this.getSessao();

      console.log(PagSeguroDirectPayment);

      this.variableGlobal.setStatusScript(true);
    }

  }

  setProduto(){
    this.pagamento.produtoId = this.produto.id;   
  }

  setFrete(){
     this.valorFrete = ConstantesUtils.FRETE_BAHIA;
  }

  //BUSCA UM ID DE SESSÃO NO BACK-END
  getSessao() {

    this.pagamentoService.obterTokenSessao()
      .subscribe(result =>
        PagSeguroDirectPayment.setSessionId(result.id),
        erro => console.log(erro)
      );

  }

  //BUSCAR TIPOS DE PAGAMENTOS
  getPaymentMethods() {
    PagSeguroDirectPayment.getPaymentMethods({
      success: function (response) { console.log('PaymentMethods', response); },
      error: function (response) { console.log('PaymentMethods', response); },
      complete: function (response) { console.log('PaymentMethods', response); }
    });

  }

  //BUSCA A BANDEIRA DO CARTÃO (EX: VISA, MASTERCARD ETC...) E DEPOIS BUSCA AS PARCELAS;
  //ESTA FUNÇÃO É CHAMADA QUANDO O INPUT QUE RECEBE O NÚMERO DO CARTÃO PERDE O FOCO;
  buscaBandeira() {


    PagSeguroDirectPayment.getBrand({

      cardBin: this.pagamento.cartao.numCard,

      success: response => {

        console.log('Dados Cartão -' + this.pagamento.cartao.numCard);

        this.pagamento.cartao.bandCard = response.brand.name;
        this.buscaParcelas();
        console.log('Bandeira do cartão: ' + this.pagamento.cartao.bandCard);

      },
      error: response => {
        console.log(response);
      }
    });

  }

  //BUSCA AS PARCELAS NA API DO PAGSEGURO PARA O CLIENTE ESCOLHER
  buscaParcelas() {

    PagSeguroDirectPayment.getInstallments({

      amount: this.produto.preco,                          //valor total da compra (deve ser informado)
      brand: this.pagamento.cartao.bandCard,  //bandeira do cartão (capturado na função buscaBandeira)
      maxInstallmentNoInterest: 3,            //maxInstallmentNoInterest - parcelamento sem juros (quantidade de parcelas)
      success: response => {

        this.parcelas = response.installments[this.pagamento.cartao.bandCard];

        console.log(response);

      },
      error: response => { console.log(response) }
    });

  }

  parcelaSelecionada(response) {

    let list = response.split("|");

    this.pagamento.parcelaQuantidade = list[0];
    this.pagamento.parcelaValor = list[1];
    

    console.log(this.pagamento);

    this.setValorTotal();


  }

  setValorTotal(){

    if(this.produto.id == 1){    

      this.valorTotal = ConstantesUtils.VALOR_TOTAL_MOUSE;
    }else{
      
     this.valorTotal = ConstantesUtils.VALOR_TOTAL_TECLADO;
    }

  }


  //BUSCA O HASH DO COMPRADOR JUNTO A API DO PAGSEGURO
  setHashComprador() {

    this.pagamento.comprador.hashComprador = PagSeguroDirectPayment.getSenderHash();
  }

  //AO CLICAR NO BOTÃO PAGAR
  onSubmit(f) {

    this.setHashComprador();


    //CRIA O HASK DO CARTÃO DE CRÉDITO JUNTO A API DO PAGSEGURO
    PagSeguroDirectPayment.createCardToken({

      cardNumber: this.pagamento.cartao.numCard,
      cvv: this.pagamento.cartao.codSegCard,
      expirationMonth: this.pagamento.cartao.mesValidadeCard,
      expirationYear: this.pagamento.cartao.anoValidadeCard,
      brand: this.pagamento.cartao.bandCard,

      // cardNumber: '4111111111111111', // Número do cartão de crédito
      // brand: 'visa', // Bandeira do cartão
      // cvv: '013', // CVV do cartão
      // expirationMonth: '12', // Mês da expiração do cartão
      // expirationYear: '2026', // Ano da expiração do cartão, é necessário os 4 dígitos.

      success: response => {


        this.pagamento.cartao.hashCard = response.card.token;
        console.log('Dados CardToken ->' + this.pagamento.cartao.hashCard);
        console.log(this.pagamento)

        //NESTE MOMENTO JÁ TEMOS TUDO QUE PRECISAMOS!
        //HORA DE ENVIAR OS DADOS PARA O BACK-END PARA CONCRETIZAR O PAGAMENTO
        this.pagar();

      },
      error: response => { console.log(response) }

    });

  }

  pagar() {

    this.pagamentoService.realizarPagamento(this.pagamento)
      .subscribe(
        sucesso => {
          this.processarSucesso(sucesso)
        },
        falha => { this.processarFalha(falha) }
      );
  }


  processarSucesso(response: Transacao) {

    let toast = this.toastr.success('Código do pagamento realizado -> ' + response.code, 'Sucesso!', {
      progressBar: true,
      timeOut: 9000
    });

    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/pagamentos/listar-todos']);
      });


    }

  }

  processarFalha(response: any) {

    console.log(response);

    this.toastr.error('Ocorreu um erro!', 'Opa :(', {
      progressBar: true,
      timeOut: 9000
    });
  }

}