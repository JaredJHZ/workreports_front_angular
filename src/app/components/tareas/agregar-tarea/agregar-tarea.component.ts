import { Component, OnInit } from '@angular/core';
import { Tarea, Respuesta } from 'src/app/interfaces/interfaces';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.css']
})
export class AgregarTareaComponent implements OnInit {

  mensaje: string ;

  tarea: Tarea = {
    id:'',
    nombre:'',
    tarifa_hora:0,
    estimado_horas:0,
    estado:''
  }

  estados: String [] = ['sin iniciar','en progreso','completa'];

  opciones: String [] = ['id','nombre','tarifa_hora','estimado_horas','estado'];

  guardar(forma: NgForm):void {
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
          this.tareaService.agregarTarea(this.tarea)
            .subscribe(
              (data: Respuesta) => {
                this.invocarMensaje(data.mensaje);
                this.borrarInformacion();
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

  borrarInformacion():void{
    this.tarea = {
      id:'',
      nombre:'',
      tarifa_hora:0,
      estimado_horas:0,
      estado:''
    }
  }

  constructor(private tareaService: TareasService) { }

  ngOnInit() {
  }

}
