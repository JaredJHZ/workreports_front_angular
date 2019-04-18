import { Component, OnInit } from '@angular/core';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/interfaces/interfaces';
import { DireccionesService } from 'src/app/services/direcciones.service';

@Component({
  selector: 'app-consultar',
  templateUrl: 'consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  id:String;
  tipo:String;
  material = {
    id:'',
    nombre:'',
    costo_unitario:0
  };
  direccion = {
    id:'',
    calle:'',
    ciudad:'',
    estado:'',
    cp:''
  }
  aux = {}
  opciones:String[] = [];

  constructor(private materialService:MaterialesService, private activatedRoute:ActivatedRoute,
    private direccionesService: DireccionesService) { 
      this.activatedRoute.params.subscribe(
        (data) => {
          this.id = data['id'];
          this.tipo = data['tipo'];
          this.cargar();
        }
      )
  }

  ngOnInit() {

  }

  cargar(){
    if (this.tipo === 'material'){
      this.opciones.push("id");
      this.opciones.push("nombre");
      this.opciones.push("costo_unitario");
        this.materialService.getMaterial(this.id).subscribe(
          (material:Respuesta) => {
            this.material["id"] = material.cliente["id"];
            this.material["nombre"] = material.cliente["nombre"]
            this.material["costo_unitario"] = material.cliente["costo_unitario"]
            this.aux = this.material;
          }
        )
    } else if (this.tipo === 'direccion'){
      this.opciones.push("id");
      this.opciones.push("calle");
      this.opciones.push("ciudad");
      this.opciones.push("estado");
      this.opciones.push("cp");

      this.direccionesService.getDireccion(this.id).subscribe(
        (data) => {
          let direccion = data.direccion;
          this.direccion.id = direccion.id;
          this.direccion.calle = direccion.calle;
          this.direccion.ciudad = direccion.ciudad;
          this.direccion.estado = direccion.estado;
          this.direccion.cp = direccion.cp;
          this.aux = this.direccion;
        }
      )
    }
  }

}
