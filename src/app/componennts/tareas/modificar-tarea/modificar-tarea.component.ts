import { Component, OnInit } from '@angular/core';
import { Tarea, Respuesta } from 'src/app/interfaces/interfaces';
import { TareasService } from 'src/app/services/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-tarea',
  templateUrl: './modificar-tarea.component.html',
  styleUrls: ['./modificar-tarea.component.css']
})
export class ModificarTareaComponent implements OnInit {

  estados: String [] = ['sin iniciar','en progreso','completa'];

  id:String;

  opciones: String[] = ['id','nombre','tarifa_hora','estimado_horas','estado','fecha_termino'];

  mensaje:string;


  tarea: Tarea = {
    id:'',
    nombre:'',
    tarifa_hora: 0,
    estimado_horas: 0,
    estado:'',
    fecha_termino:''
  }

  constructor(private tareaService:TareasService, private activatedRoute: ActivatedRoute) {
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

  ngOnInit() {
  }

  guardar(forma:NgForm):void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¿Desea realizar la operación?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "aceptar"
    }).then((result) => {
        if (result) {
          this.tareaService.modificarTarea(this.id, this.tarea)
                .subscribe(
                  (data: Respuesta) => {
                    this.invocarMensaje(data.mensaje);
                  }
                )
        }
    }
    )
  }

  invocarMensaje(mensaje):void{
    // Funcion que permite mandar un sweetalert con informacion e invoca a la funcion que limpia el formulario
   Swal.fire(
     mensaje
   )
   this.mensaje = null;
   
  };

}
