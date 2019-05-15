import { Component, OnInit } from '@angular/core';
import { Tarea, Respuesta } from 'src/app/interfaces/interfaces';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-consulta-tareas',
  templateUrl: './consulta-tareas.component.html',
  styleUrls: ['./consulta-tareas.component.css']
})
export class ConsultaTareasComponent implements OnInit {

  tareas:Tarea[];
  mostrarResultados:boolean = false;
  tareasBuscadas:Tarea[];
  terminoBuscado:string;

  constructor(private tareasService:TareasService) {
      this.tareasService.getAll().subscribe(
        (data:Respuesta) => {
          console.log(data.tareas);
          this.tareas = data.tareas;
        }
      )
   }

  ngOnInit() {
  }

  buscar():void {
    this.mostrarResultados = true;
  }

  refrescarBusqueda():void {
    this.tareasBuscadas = this.tareas.filter(
        (tarea) => tarea.nombre.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )
  }

}
