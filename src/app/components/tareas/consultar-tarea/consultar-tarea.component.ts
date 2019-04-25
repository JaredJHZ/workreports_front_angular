import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Tarea, Respuesta } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-consultar-tarea',
  templateUrl: './consultar-tarea.component.html',
  styleUrls: ['./consultar-tarea.component.css']
})
export class ConsultarTareaComponent implements OnInit {

  

  constructor(private tareaService:TareasService) {
      
   }

  ngOnInit() {
  }

}
