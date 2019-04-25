import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Tarea, Respuesta } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultar-tarea',
  templateUrl: './consultar-tarea.component.html',
  styleUrls: ['./consultar-tarea.component.css']
})
export class ConsultarTareaComponent implements OnInit {

  tarea: Tarea = {
    id:'',
    nombre:'',
    tarifa_hora: 0,
    estimado_horas: 0,
    estado:'',
    fecha_termino:''
  }

  estados: String [] = ['sin iniciar','en progreso','completa'];

  id:String;

  opciones: String[] = ['id','nombre','tarifa_hora','estimado_horas','estado','fecha_termino'];
  

  constructor(private tareaService:TareasService, private activatedRoute: ActivatedRoute) {

      this.activatedRoute.params
        .subscribe(
          (data) => {
            this.id = data['id'];
            this.tareaService.getTarea(this.id)
              .subscribe(
                (data) => {
                  let tarea = data.tarea;
                  console.log(tarea);
                  this.tarea.id = tarea.id;
                  this.tarea.estado = tarea.estado;
                  this.tarea.estimado_horas = tarea.estimado;
                  this.tarea.nombre = tarea.nombre;
                  this.tarea.tarifa_hora = tarea.tarifa;
                }
              )
          }
        )
      
   }

  ngOnInit() {
  }

}
