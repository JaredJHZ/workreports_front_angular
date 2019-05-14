import { Component, OnInit } from '@angular/core';
import { Tarea, Respuesta } from 'src/app/interfaces/interfaces';
import { TareasService } from 'src/app/services/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-busqueda-tareas',
  templateUrl: './busqueda-tareas.component.html',
  styleUrls: ['./busqueda-tareas.component.css']
})
export class BusquedaTareasComponent implements OnInit {

  tipo:String;
  terminoBuscado:string;
  listaTareas:Tarea[];
  tareas:Tarea[];
  mensaje:String;

  constructor(private tareasService:TareasService, private activatedRoute:ActivatedRoute, private router:Router) { 
    this.activatedRoute.params.subscribe(
      params => {
        this.tipo = params['tipo'];
        this.tareasService.getAll()
            .subscribe(
              (data:Respuesta) => {
                this.listaTareas = data.tareas;
              }
            )
      }
    )
  }

  ngOnInit() {
  }

  cambiarBusqueda():void{
    this.tareas = this.listaTareas.filter(
      (tarea) => tarea.nombre.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )

  }

  busqueda():void {
    if ( this.tareas === undefined || this.tareas.length <= 0) {
      this.showMessage("No existen materiales con ese termino de busqueda");
    } else {
      this.router.navigate(['tareas',this.tipo,this.terminoBuscado,this.tareas[0].id]);
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

}
