import { Component, OnInit } from '@angular/core';
import { Tarea, Respuesta } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from 'src/app/services/tareas.service';
import { comprobarDatosQueNoEstenVacios } from 'src/app/funciones';

@Component({
  selector: 'app-modificar-tareas',
  templateUrl: './modificar-tareas.component.html',
  styleUrls: ['./modificar-tareas.component.css']
})
export class ModificarTareasComponent implements OnInit {

  terminoBuscado:string;
  tarea:Tarea;
  listaDeTareas:Tarea[];
  mensaje:String;
  fecha_termino:Date;
  horas_reales:number;
  boton1:String = 'Anterior';
  boton2:String = 'Siguiente';

  estados: String [] = ['SIN INICIAR','EN PROGRESO','COMPLETA'];

  constructor(private activatedRoute:ActivatedRoute, private tareasService:TareasService, private router:Router) { 
    this.activatedRoute.params.subscribe(
      (params) => {
        this.terminoBuscado = params['termino'];
          this.tareasService.getTarea(params['id'])
              .subscribe(
                (data:Respuesta) => {
                    this.tarea = data.tarea;
                    this.horas_reales = this.tarea.real_horas;
                    this.fecha_termino = new Date(this.tarea.fecha_termino);
                    this.tareasService.getAll()
                        .subscribe(
                          (respuesta:Respuesta) => {
                            let tareas = respuesta.tareas;
                            this.listaDeTareas = tareas.filter(
                              (tarea) => tarea.id !== this.tarea.id && tarea.nombre.toUpperCase().includes(this.terminoBuscado.toUpperCase())
                            )
                            if (this.listaDeTareas.length <= 0) {
                              this.boton1 = 'Cancelar';
                              this.boton2 = 'Modificar';
                            }
                          }
                        )
                }
              )
      }
    )
  }
  ngOnInit() {
  }

  modificar(){
    this.tarea.real_horas = this.horas_reales;
    let camposVacios = comprobarDatosQueNoEstenVacios(this.tarea);
    if(this.tarea.estado === 'COMPLETA') {
        this.tarea.fecha_termino = this.fecha_termino;
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
      this.tarea.tarifa_hora = this.tarea.tarifa;
      this.tarea.estimado_horas = this.tarea.estimado;
      this.horas_reales = this.tarea.real_horas;
      this.tareasService.modificarTarea(this.tarea.id,this.tarea)
          .subscribe(
            (data) => this.router.navigate(['busqueda/tareas/modificaciones']),
            (data:Respuesta) => this.showMessage(data.error.mensaje)
          )
    } else {
      this.showMessage('Campos vacios: '+camposVacios.join(' ,'));
    }
  }

  siguiente():void {
    if(this.listaDeTareas.length > 1){
       this.router.navigate(['tareas/modificaciones',this.terminoBuscado,this.listaDeTareas[1].id]);
    }
  }
 
  anterior():void{
   if(this.listaDeTareas.length > 0){
     this.router.navigate(['tareas/modificaciones',this.terminoBuscado,this.listaDeTareas[0].id]);
   }
  }
 
  showMessage(mensaje:String):void{
   this.mensaje = mensaje;
   setTimeout(() => {
     this.mensaje = '';
   }, 3000);
 }

 boton1Handler():void {
  if (this.boton1.includes('Cancelar')) {
    this.router.navigate(['/']);
  } else {
    this.anterior();
  }
}

boton2Handler():void {
  if (this.boton2.includes('Modificar')) {
    this.modificar();
  } else {
    this.siguiente();
  }
}

}
