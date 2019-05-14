import { Component, OnInit } from '@angular/core';
import { Tarea, Respuesta } from 'src/app/interfaces/interfaces';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { arreglarId, comprobarDatosQueNoEstenVacios } from 'src/app/funciones';

@Component({
  selector: 'app-altas-tarea',
  templateUrl: './altas-tarea.component.html',
  styleUrls: ['./altas-tarea.component.css']
})
export class AltasTareasComponent implements OnInit {

  mensaje: String ;

  tarea: Tarea = {
    id:'',
    nombre:'',
    tarifa_hora:0,
    estimado_horas:0,
    estado:''
  }

  horas_reales:number = 0;

  fecha_termino:Date;

  estados: String [] = ['SIN INICIAR','EN PROGRESO','COMPLETA'];

  constructor(private tareaService: TareasService) { }

  ngOnInit() {
  }

  changeID():void{
    if(!Number(this.tarea.id.charAt(this.tarea.id.length-1)) || this.tarea.id.length > 5){
      this.tarea.id = this.tarea.id.slice(0,this.tarea.id.length-1);
    }
  }

  setHorasReales():void{
    this.tarea.horas_reales = this.horas_reales;
  }
  
  alta(forma: NgForm) {
    this.tarea.id = arreglarId(this.tarea.id);
    let camposVacios = comprobarDatosQueNoEstenVacios(this.tarea);
    if(this.tarea.estado === 'COMPLETA') {
      this.setHorasReales();
    }

    if (this.tarea.tarifa <= 0 ) {
      this.showMessage('La tarifa debe ser mayor que 0');
      return false;
    }

    if (this.tarea.estimado_horas <= 0) {
      this.showMessage('El estimado de horas debe ser mayor que 0');
      return false;
    }

    if(camposVacios.length <= 0) {
        this.tareaService.agregarTarea(this.tarea)
            .subscribe(
              (data:Respuesta) => this.limpiarDatos(),
              (data:Respuesta) => {
                this.showMessage(data.error.mensaje);
                this.tarea.id = '';
              }
            )
    } else {
      this.showMessage('Campos vacios: '+camposVacios.join(', '));
    }


  }



  limpiarDatos():void{
    this.tarea = {
      id:'',
      nombre:'',
      tarifa_hora:0,
      estimado_horas:0,
      estado:''
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

}