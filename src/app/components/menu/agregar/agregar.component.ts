import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Respuesta } from 'src/app/interfaces/interfaces';
import { DireccionesService } from 'src/app/services/direcciones.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  tipo: String; 
  opciones:String[] = [];
  mensaje:String;

  material: {
    id:'',
    nombre:'',
    costo_unitario: Number
  }

  direccion: {
    id: '',
    calle:'',
    ciudad:'',
    estado:'',
    cp:''
  }



  constructor(private activatedRoute: ActivatedRoute, private materialService:MaterialesService,
     private direccionesService: DireccionesService) {

    this.activatedRoute.params.subscribe(
      (data) => {
        this.tipo = data.tipo;
        this.armar();
      }
    )
   }

   agregar(forma: NgForm) {
     switch (this.tipo){
        case 'Materiales':


          this.material = forma.value;
          this.material.costo_unitario = Number(this.material.costo_unitario);
          this.materialService.agregarMaterial(this.material).subscribe(
            (data: Respuesta) => {
              if (data) {
                  this.mensaje = data.mensaje;
                  setTimeout(() => {
                    this.mensaje = null;
                  }, 3000);
              }
            },
            (error) => {
              console.log(error.error.mensaje);
              this.mensaje = error.error.mensaje;
              console.log(this.mensaje);
              setTimeout(() => {
                this.mensaje = null;
              }, 3000);
            }
          );
          break;


        case 'Direcciones':


            this.direccion = forma.value;
            this.direccionesService.agregarDireccion(this.direccion).subscribe(
              (data) => {
                setTimeout(() => {
                  this.mensaje = data.mensaje;
                }, 3000);
              },
              (error) => {
                setTimeout(() => {
                  this.mensaje = "Error al agregar direccion";
                }, 3000);
                
              }
            )
     }

   }

   armar(){
    if(this.tipo.includes("Materiales")) {
      this.opciones.push('id');
      this.opciones.push("nombre");
      this.opciones.push("costo_unitario");
    }  else if (this.tipo.includes("Direcciones")){
      this.opciones.push('id');
      this.opciones.push("calle");
      this.opciones.push("ciudad");
      this.opciones.push("estado");
      this.opciones.push("cp");
    }
   }

  ngOnInit() {
  }

}
