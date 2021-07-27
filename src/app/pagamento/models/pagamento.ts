import { Cartao } from "./cartao";
import { Comprador } from "./comprador";

export class Pagamento{

    public id:number;
    public parcelaQuantidade: number;
    public parcelaValor: number;
    public produtoId : number;
    public cartao: Cartao = new Cartao;
    public comprador: Comprador = new Comprador;

}