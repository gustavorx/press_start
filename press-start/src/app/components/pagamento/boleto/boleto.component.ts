import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css']
})

export class BoletoComponent implements OnInit {
  
  esconderImprimir: boolean = false;
  codigo: string = "";
  
  ngOnInit(): void {
    this.gerarCodigoPix();
  }
  
  imprimir(){
      this.esconderImprimir = true;
      setTimeout(function(){ 
        window.print();
       }, 500);   
  }

  gerarCodigoPix(){
    var part1: string = this.stringAleatoria(5, '0123456789');
    var part2: string = this.stringAleatoria(5, '0123456789');
    var part3: string = this.stringAleatoria(5, '0123456789');
    var part4: string = this.stringAleatoria(6, '0123456789');
    var part5: string = this.stringAleatoria(5, '0123456789');
    var part6: string = this.stringAleatoria(6, '0123456789');
    var part7: string = this.stringAleatoria(1, '0123456789');
    var part8: string = this.stringAleatoria(15, '0123456789');

    this.codigo = part1 + "." + part2 + "." + part3 + "." + part4 + " " + part5 + "." + part6 + " " + part7 + " " + part8;
  }

  stringAleatoria(length: number, chars: string | any[]) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }

}