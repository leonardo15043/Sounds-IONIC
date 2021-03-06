import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';

import { Refresher , reorderArray} from 'ionic-angular';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio(); 
  audioTiempo: any;
  ordenando:boolean = false;

  constructor(public navCtrl: NavController) {

    this.animales = ANIMALES.slice(0);

  }

  reproducir( animal:Animal){

    this.pausarAudio( animal );
    
    if( animal.reproduciendo ){
        animal.reproduciendo = false;
        return;
    }
  
     this.audio.src = animal.audio;

     this.audio.load();
     this.audio.play();

     animal.reproduciendo = true;

     this.audioTiempo = setTimeout( ()=> animal.reproduciendo = false , animal.duracion * 1000 );

  }

  private pausarAudio( animalSel:Animal ){

    clearTimeout( this.audioTiempo );
    this.audio.pause();
    this.audio.currentTime = 0;

    for ( let animal of this.animales ){
      if( animal.nombre != animalSel.nombre){
        animal.reproduciendo = false;
      }
    }

  }

  borrar_anima( idx: number ){
    
    this.animales.splice( idx , 1);
  }

  recargarAnimales( refresher:Refresher ){
    console.log("inicio del refresh");
      this.animales = ANIMALES.slice(0);
    setTimeout(()=>{
       refresher.complete();
    },1500)
  }

  reordenarAnimales( indices ){
      this.animales = reorderArray( this.animales , indices );
  }

}
