import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from "src/app/services/base.service";
import { Produto } from "../models/produto";


@Injectable()
export class ProdutoService extends BaseService {

    constructor(private http: HttpClient ) { super() }

    listarProdutos(): Observable<Produto[]> {
        return this.http
            .get<Produto[]>(this.UrlServiceV1 + "produtos/" , super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    buscarProdutoPorCodigo(codigo : number ): Observable<Produto> {
        return this.http
            .get<Produto>(this.UrlServiceV1 + "produtos/" + codigo , super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

}