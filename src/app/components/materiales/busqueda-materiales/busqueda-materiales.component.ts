import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Respuesta, Material } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-busqueda-materiales',
  templateUrl: './busqueda-materiales.component.html',
  styleUrls: ['./busqueda-materiales.component.css']
})
export class BusquedaMaterialesComponent implements OnInit {

  tipo:String;
  terminoBuscado:string;
  listaDeMateriales:Material[];
  materiales:Material[];
  mensaje:String;

  constructor(private activatedRoute:ActivatedRoute, private materialesService:MaterialesService, private router:Router) { 
    this.activatedRoute.params.subscribe(
      params => {
        this.tipo = params['tipo'];
        this.materialesService.getTodosMateriales()
            .subscribe(
              (data:Respuesta) => {
                this.listaDeMateriales = data.materiales;
              }
            )
      }
    )
  }

  ngOnInit() {
  }

  cambiarBusqueda():void{
    this.materiales = this.listaDeMateriales.filter(
      (material) => material.nombre.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )

  }

  busqueda():void {
    if ( this.materiales === undefined || this.materiales.length <= 0) {
      this.showMessage("No existen materiales con ese termino de busqueda");
    } else {
      this.router.navigate(['materiales',this.tipo,this.terminoBuscado,this.materiales[0].id]);
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

}
