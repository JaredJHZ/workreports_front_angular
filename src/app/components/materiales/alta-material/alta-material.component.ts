import { Component, OnInit } from '@angular/core';
import { Material, Respuesta } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { arreglarId, comprobarDatosQueNoEstenVacios } from 'src/app/funciones';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-alta-material',
  templateUrl: './alta-material.component.html',
  styleUrls: ['./alta-material.component.css']
})
export class AltaMaterialComponent implements OnInit {

  material:Material = {
    id:'',
    nombre:'',
    costo:0
  }

  mensaje:String;

  opciones:string[] = ['Clave','Nombre del material','Costo unitario del material'];

  constructor(private materialesService:MaterialesService) { }

  ngOnInit() {
  }

  changeID():void{
    if(!Number(this.material.id.charAt(this.material.id.length-1)) || this.material.id.length > 5){
      this.material.id = this.material.id.slice(0,this.material.id.length-1);
    }
  }

  alta(forma:NgForm):void {
    this.material.id = arreglarId(this.material.id);
    let camposVacios = comprobarDatosQueNoEstenVacios(this.material);
    
    if(camposVacios.length <= 0){
      this.materialesService.agregarMaterial(this.material)
          .subscribe(
            (data:Respuesta) => {
              this.limpiarDatos();
            },
            (data:Respuesta) => {
              this.showMessage(data.error.mensaje);
              this.material.id = '';
            }
          )
    } else {
      this.showMessage('Campos vacios: '+camposVacios.join(', '));
    }


  }

  limpiarDatos():void{
    this.material = {
      id:'',
      nombre:'',
      costo:0
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

}
