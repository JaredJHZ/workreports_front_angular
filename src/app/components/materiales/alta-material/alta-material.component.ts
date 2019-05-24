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

  clavesMateriales:String[];

  mensajeClave:boolean = false;

  opciones:string[] = ['Clave','Nombre del material','Costo unitario del material'];

  constructor(private materialesService:MaterialesService) { 
      this.materialesService.getTodosMateriales()
          .subscribe(
            (data:Respuesta) => this.clavesMateriales = data.materiales
                                                          .map(
                                                            (material: Material) => material.id 
                                                            )
          )
  }

  ngOnInit() {
  }

  changeID(e,el):void{
    if(this.material.id.length >= 5) {
      if (this.clavesMateriales.includes(this.material.id)) {
        this.material.id = '';
        this.mensajeClave = true;
      } else {
        el.focus();
        this.mensajeClave = false;
      }
    }
    if (this.material.id.charAt(this.material.id.length-1).includes("0") && this.material.id.length <=5) {
      return;
    }
    if(!Number(this.material.id.charAt(this.material.id.length-1)) || this.material.id.length > 5){
      this.material.id = this.material.id.slice(0,this.material.id.length-1);
    }
  }

  alta(forma:NgForm, el):void {
    this.material.id = arreglarId(this.material.id);
    let camposVacios = comprobarDatosQueNoEstenVacios(this.material);
    
    if(camposVacios.length <= 0){
      this.materialesService.agregarMaterial(this.material)
          .subscribe(
            (data:Respuesta) => {
              this.limpiarDatos();
              el.focus();
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
