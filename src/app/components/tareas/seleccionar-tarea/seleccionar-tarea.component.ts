import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Respuesta, Tarea } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-seleccionar-tarea',
  templateUrl: './seleccionar-tarea.component.html',
  styleUrls: ['./seleccionar-tarea.component.css']
})
export class SeleccionarTareaComponent implements OnInit {

  tareas: Tarea[] = [];
  tareasActuales: Tarea[];
  paginaActual = 1;
  paginasTotales = 0;

  constructor(private tareaService:TareasService) { 
    this.tareaService.getAll()
        .subscribe(
          (data: Respuesta) => {
            this.paginasTotales = data.tareas.length / 2;
            this.paginasTotales = (data.tareas.length % 2 === 1 ? this.paginasTotales + 1 : this.paginasTotales );
            this.tareas = data.tareas;
            this.paginar();
          }
        )
  }

  paginar() {
    let li = (this.paginaActual === 1 ? 1 : this.paginaActual * 2 - 1);
    let ls = li + 1;
    this.tareasActuales = this.tareas.filter(
      (tarea, idx) => idx+1 >= li && idx+1 <= ls
    )
  }

  siguiente(){
    this.paginaActual = (this.paginaActual + 1 <= this.paginasTotales ? this.paginaActual + 1 : 1);
    this.paginar();
  }

  anterior() {
    this.paginaActual = (this.paginaActual - 1 === 0 ? 1 : this.paginaActual - 1 );
    this.paginar();
  }



  ngOnInit() {
  }

}
