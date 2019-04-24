import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  tipo: String;
  img: String;

  constructor(private activatedRouter: ActivatedRoute, private location:Location) {
    this.activatedRouter.params.subscribe(
      (data) => {
        if (data["tipo"]) {
          this.tipo = this.capitalize(data.tipo);
          this.imagenes(this.tipo);
        }
      }
    )
   }

   capitalize(tipo:String):String {
      let aux = tipo.substring(1);
      let letter = tipo.charAt(0).toUpperCase();
      return letter+aux;
   }

   atras() {
      this.location.back();
   }

   imagenes(tipo){
     if (tipo === 'Materiales'){
       this.img = '/assets/cons.jpg';
     } else if (tipo === 'Usuarios'){
       this.img = '/assets/usuarios.png';
     } else if (tipo === 'Direcciones'){
       this.img = '/assets/direcciones.jpeg'
     }
   }

  ngOnInit() {
  }

}
