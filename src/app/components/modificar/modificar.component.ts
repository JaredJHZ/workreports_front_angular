import { Component, OnInit } from '@angular/core';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Respuesta } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  tipo:String;
  id:String;
  opciones:String[] = [];
  mensaej: String;
  material = {
    nombre:'',
    costo_unitario:0
  };
  constructor(private materialS:MaterialesService, private activatedRoute:ActivatedRoute) { 
      this.activatedRoute.params.subscribe(
        (data) => {
            this.tipo = data["tipo"];
            this.id = data["id"];
            
            if(this.tipo === "material") {
              this.opciones.push("nombre");
              this.opciones.push("costo_unitario");
              this.materialS.getMaterial(this.id).subscribe(
                (material:Respuesta) => {
                  this.material["nombre"] = material.cliente["nombre"]
                  this.material["costo_unitario"] = material.cliente["costo_unitario"]
                }
              )
            }


            
        }
      )
  }

  ngOnInit() {
  }

  guardar(forma:NgForm){
      this.materialS.modifyMaterial(this.id,forma.value).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      )
  }
}
