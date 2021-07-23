import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from "src/app/services/base.service";
import { Pagamento } from "../models/pagamento";
import { Sessao } from "../models/sessao";
import { Transacao } from "../models/transacao";

@Injectable()
export class PagamentoService extends BaseService {

    constructor(private http: HttpClient ) { super() }


    obterTokenSessao(): Observable<Sessao>  {
        return this.http
            .get<Sessao>(this.UrlServiceV1 + "checkouts/transparente/session/" , super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    realizarPagamento(pagamento: Pagamento): Observable<Transacao>{
        return this.http
            .post<Transacao>(this.UrlServiceV1 + "checkouts/transparente/cartao-credito/", pagamento , super.ObterHeaderJson())
            .pipe(
                //map(super.extractData),
                catchError(super.serviceError));
    }

    listarTransacoes(): Observable<Transacao[]> {
        return this.http
            .get<Transacao[]>(this.UrlServiceV1 + "checkouts/transacoes/" , super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    buscarTrancacaoPorCodigo(code : string ): Observable<Transacao> {
        return this.http
            .get<Transacao>(this.UrlServiceV1 + "checkouts/transacoes/" + code , super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }


}