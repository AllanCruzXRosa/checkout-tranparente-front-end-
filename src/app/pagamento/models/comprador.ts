import { Contato } from "./contato";
import { Endereco } from "./endereco";

export class Comprador {

    public hashComprador:string; 
    public nome:string       = 'Marcos Paulo Cruz';
    public cpf:string        = '02021117090';
    public nascimento:string = '13/04/1988';
    public endereco:Endereco = new Endereco;
    public contato:Contato = new Contato;
}