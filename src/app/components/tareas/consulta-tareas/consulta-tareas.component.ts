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
  mensaje:String;

  constructor(private tareasService:TareasService) {
      this.tareasService.getAll().subscribe(
        (data:Respuesta) => {
          this.tareas = data.tareas;
        }
      )
   }

  ngOnInit() {
  }

  limpiar():void {
    this.mostrarResultados = false;
    this.tareasBuscadas = [];
    this.terminoBuscado = '';
  }

  buscar():void {
    if (this.tareasBuscadas.length <= 0) {
      this.showMessage('Tarea no encontrada');
    } else {
      this.mostrarResultados = true;
    }
  }

  refrescarBusqueda():void {
    this.tareasBuscadas = this.tareas.filter(
        (tarea) => tarea.nombre.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )
  }

  showMessage(mensaje:String):void {
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  

}
