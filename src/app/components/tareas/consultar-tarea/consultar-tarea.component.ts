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

  estados: String [] = ['SIN INICIAR','EN PROGRESO','COMPLETA'];

  id:String;

  opciones: String[] = ['id','nombre','tarifa_hora','estimado_horas','estado','fecha_termino'];
  

  constructor(private tareaService:TareasService, private activatedRoute: ActivatedRoute) {

      this.activatedRoute.params
        .subscribe(
          (data) => {
            this.id = data['id'];
            this.tareaService.getTarea(this.id)
              .subscribe(
                (data: Respuesta) => {
                  let tarea = data.tarea;
                  console.log(tarea);
                  if (tarea.hasOwnProperty('real_horas')) {
                    this.tarea.horas_reales = tarea['real_horas'];
                    this.opciones.push('horas_reales');
                    console.log(this.tarea);
                    console.log()
                  }
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

}
