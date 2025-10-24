import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {
  //atributos
  ejercicio:string="";
  respuesta:any="";
  contador=0;
  num_ejercicios:number=5;
  contrasenia="deltArune"
  codigo:string="";
  msgAlert=(title:string,icon:any,text?:string)=>{
    Swal.fire({
      title,
      icon,
      text
    });
  };
  //métodos
  ngOnInit(){
    this.codigo=this.cyrb128(this.contrasenia).toString();
    this.generarEjerciciosRandom();
  }

  generarEjerciciosRandom(){
    this.ejercicio="";
    let operaciones=["+","-","*","/"];
    for(let i=1; i<=2;i++){
        if(i>1){
          this.ejercicio+=operaciones[ Math.floor(Math.random()*3)];
        }
        this.ejercicio+=Math.floor(Math.random()*100);
        this.ejercicio+=operaciones[ Math.floor(Math.random()*3)];
        this.ejercicio+=Math.floor(Math.random()*100);
    }
  }

  enviarRespuesta(){
    let resultado= Number(eval(this.ejercicio));
    if(this.contador<this.num_ejercicios && resultado==this.respuesta){
      this.contador++;
      this.generarEjerciciosRandom();
      this.respuesta="";
      if(this.contador>=this.num_ejercicios){
        this.msgAlert("Felicidades!!!","success",`La contraseña es:\n${this.codigo}`);
      }else{
        this.msgAlert("Respuesta correcta","success",`Quedan ${this.num_ejercicios-this.contador} ejercicios`);
      }
    }else if(this.contador<this.num_ejercicios && resultado!=this.respuesta){
      this.msgAlert("Respuesta incorrecta","error");
    }else{
      this.msgAlert("Felicidades!!!","success",`La contraseña es:\n${this.codigo}`);
    }
  }

   cyrb128(str:string) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0];
}

}
