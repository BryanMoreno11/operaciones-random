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
  codigo:string="4StApxSedpl2kQb";
  msgAlert=(title:string,icon:any,text?:string)=>{
    Swal.fire({
      title,
      icon,
      text
    });
  };
  //métodos
  ngOnInit(){
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

}
