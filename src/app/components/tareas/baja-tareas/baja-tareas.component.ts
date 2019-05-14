import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from 'src/app/services/tareas.service';
import { Respuesta, Tarea } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-baja-tareas',
  templateUrl: './baja-tareas.component.html',
  styleUrls: ['./baja-tareas.component.css']
})
export class BajaTareasComponent implements OnInit {

  terminoBuscado:string;
  tarea:Tarea;
  listaDeTareas:Tarea[];
  mensaje:String;

  estados: String [] = ['SIN INICIAR','EN PROGRESO','COMPLETA'];

  constructor(private activatedRoute:ActivatedRoute, private tareasService:TareasService, private router:Router) { 
    this.activatedRoute.params.subscribe(
      (params) => {
        this.terminoBuscado = params['termino'];
          this.tareasService.getTarea(params['id'])
              .subscribe(
                (data:Respuesta) => {
                    this.tarea = data.tarea;
                    this.tareasService.getAll()
                        .subscribe(
                          (respuesta:Respuesta) => {
                            let tareas = respuesta.tareas;
                            this.listaDeTareas = tareas.filter(
                              (tarea) => tarea.id !== this.tarea.id && tarea.nombre.toUpperCase().includes(this.terminoBuscado.toUpperCase())
                            )
                          }
                        )
                }
              )
      }
    )
  }

  ngOnInit() {
  }

  borrar():void {
    this.tareasService.eliminarTarea(this.tarea.id)
        .subscribe(
          (data) => this.router.navigate(['busqueda/tareas/bajas']),
          (data:Respuesta) => this.showMessage(data.error.mensaje)
        )
 }
 

 siguiente():void {
   if(this.listaDeTareas.length > 1){
      this.router.navigate(['tareas/bajas',this.terminoBuscado,this.listaDeTareas[1].id]);
   }
 }

 anterior():void{
  if(this.listaDeTareas.length > 0){
    this.router.navigate(['tareas/bajas',this.terminoBuscado,this.listaDeTareas[0].id]);
  }
 }

 showMessage(mensaje:String):void{
  this.mensaje = mensaje;
  setTimeout(() => {
    this.mensaje = '';
  }, 3000);
}

}
