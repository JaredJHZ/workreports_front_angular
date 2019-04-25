import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Tarea, Respuesta } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-eliminar-tarea',
  templateUrl: './eliminar-tarea.component.html',
  styleUrls: ['./eliminar-tarea.component.css']
})
export class EliminarTareaComponent implements OnInit {

  tarea: Tarea = {
    id:'',
    nombre:'',
    tarifa_hora: 0,
    estimado_horas: 0,
    estado:'',
    fecha_termino:''
  }

  mensaje:string;

  estados: String [] = ['sin iniciar','en progreso','completa'];

  id:String;

  opciones: String[] = ['id','nombre','tarifa_hora','estimado_horas','estado','fecha_termino'];

  constructor(private tareaService: TareasService, private activatedRoute: ActivatedRoute, private route:Router) {

    this.activatedRoute.params
    .subscribe(
      (data) => {
        this.id = data['id'];
        this.tareaService.getTarea(this.id)
          .subscribe(
            (data: Respuesta) => {
              let tarea = data.tarea;
              this.tarea.id = tarea.id;
              this.tarea.estado = tarea.estado;
              this.tarea.estimado_horas = tarea.estimado;
              this.tarea.nombre = tarea.nombre;
              this.tarea.tarifa_hora = tarea.tarifa;
              this.tarea.fecha_termino = tarea.fecha_termino;
            }
          )
      }
    )

   }

   eliminar(forma: NgForm):void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¿Desea realizar la operación?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "aceptar"
    }).then((result) => {
        if(result) {
          this.tareaService.eliminarTarea(this.id)
                .subscribe(
                  (data: Respuesta) => {
                    this.invocarMensaje(data.mensaje);
                    this.regresar();
                  }
                )
        }
    });
  }

   invocarMensaje(mensaje):void{
    // Funcion que permite mandar un sweetalert con informacion e invoca a la funcion que limpia el formulario
   Swal.fire(
     mensaje
   )
   this.mensaje = null;
   
  };

  regresar():void{
    this.route.navigate(['/tareas','seleccionar','eliminar']);
  }

  ngOnInit() {
  }

}
