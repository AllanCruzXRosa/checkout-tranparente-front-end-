

export class Dados{

    public id:number;
    public nome:string       = 'Marcos Paulo Cruz';
    public telefone:string   = '(71) 988997885';
    public email:string      = 'teste@sandbox.pagseguro.com.br';
    public cpf:string        = '020.211.170-90';
    public nascimento:string = '13/04/1988';
    public logradouro:string = 'Rua São Geraldo';
    public numero:string     = '533';
    public bairro:string     = 'São Cristóvão';
    public cep:string        = '41500-350';
    public cidade:string     = 'Salvador';
    public estado:string     = 'Ba';
    public numCard:string;              //ex: '4111111111111111'      
    public mesValidadeCard:string;      // ex: '12';
    public anoValidadeCard:string;      // ex: '2030';
    public codSegCard:string;           // ex: '123';
    public hashComprador:string;        // preenchido dinamicamente
    public bandCard:string;             // preenchido dinamicamente
    public hashCard:string;             // preenchido dinamicamente
    public parcelas:Array<Object> = []; // preenchido dinamicamente
    public parcelaQuantidade: number;
    public parcelaValor: number;
   

   

    constructor(obj?) {
        
        Object.assign(this, obj, {}, {});
    }
}


