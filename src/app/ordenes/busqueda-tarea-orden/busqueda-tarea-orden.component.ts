import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Orden, Respuesta, Tarea } from 'src/app/interfaces/interfaces';
import { TareasService } from 'src/app/services/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-busqueda-tarea-orden',
  templateUrl: './busqueda-tarea-orden.component.html',
  styleUrls: ['./busqueda-tarea-orden.component.css']
})
export class BusquedaTareaOrdenComponent implements OnInit {

  mostrar:boolean = false;
  listaOrdenes:Orden[];
  ordenes:Orden[];
  terminoBuscado:string;
  mensaje:String;
  id_tarea:String;
  nombre_tarea:String
  claveTareas:String[];
  tipo:String;
  orden:Orden;

  constructor(private ordenesService:OrdenesService, private tareasService:TareasService, private activatedRoute: ActivatedRoute, private router:Router) { 
      this.ordenesService.getAllOrdenes()
          .subscribe(
            (data:Respuesta) => {
              this.ordenes = data.ordenes;
            }
          )

      this.tareasService.getAll()
            .subscribe(
              (data:Respuesta) => {
                this.claveTareas = data.tareas.map((tarea:Tarea) => tarea.id)
              }
            )

      this.activatedRoute.params.subscribe(
        (data:Respuesta) => {
          this.tipo = data['tipo'];
        }
      )
  }

  encontrarID():void {
    if(this.id_tarea.length >= 5) {
      if(!this.claveTareas.includes(this.id_tarea)) {
        this.id_tarea = '';
        this.showMessage('No existe la tarea!');
        return;
      } else {
        let seEncuentra = false;
        for(let i = 0; i < this.orden.tareas.length ; i ++)  {
          if(this.orden.tareas[i]['id'] === this.id_tarea) {
            seEncuentra = true;
          }
        }

        if(!seEncuentra) {
          this.showMessage('La tarea no se encuentra en la orden de trabajo');
          this.id_tarea = '';
        } else {
          this.tareasService.getTarea(this.id_tarea)
              .subscribe((data:Respuesta) => this.nombre_tarea = data.tarea.nombre)
        }
      }
    }
    if(this.id_tarea.charAt(this.id_tarea.length-1).includes("0") && this.id_tarea.length <= 5) {
      return
    }
    if(!Number(this.id_tarea.charAt(this.id_tarea.length-1)) || this.id_tarea.length > 5){
      this.id_tarea= this.id_tarea.slice(0,this.id_tarea.length-1);
    }
  }

  cambiarBusqueda():void{
    this.listaOrdenes = this.ordenes.filter(
      (orden) => orden.id.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )

  }

  limpiar():void {
    this.mostrar = false;
    this.terminoBuscado = '';
  }

  ngOnInit() {
  }

  busqueda():void {
    if ( this.listaOrdenes === undefined || this.listaOrdenes.length <= 0) {
      this.showMessage("No existen ordenes con ese termino de busqueda");
    } else {
      this.mostrar = true;
      this.ordenesService.getOrden(this.terminoBuscado)
          .subscribe(
            (data:Respuesta) => this.orden = data.orden 
          )
    }
  }

 

  cambiarIDTarea():void {
    if(this.id_tarea.length >= 5) {
      if(!this.claveTareas.includes(this.id_tarea)) {
        this.id_tarea = '';
        this.showMessage('No existe la tarea!');
        return;
      } else {
        this.tareasService.getTarea(this.id_tarea)
            .subscribe(
              (data:Respuesta) => this.nombre_tarea = data.tarea.nombre
            )
      }
    }
    if(this.id_tarea.charAt(this.id_tarea.length-1).includes("0") && this.id_tarea.length <= 5) {
      return
    }
    if(!Number(this.id_tarea.charAt(this.id_tarea.length-1)) || this.id_tarea.length > 5){
      this.id_tarea= this.id_tarea.slice(0,this.id_tarea.length-1);
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  agregar():void {
      this.ordenesService.agregarTarea(this.terminoBuscado,this.id_tarea)
          .subscribe(
            (data:Respuesta) => this.router.navigate(['/'])
          )
  }

  eliminar():void {
    this.ordenesService.eliminarTarea(this.terminoBuscado, this.id_tarea)
        .subscribe(
          (data:Respuesta) => this.router.navigate(['/'])
        )
  }

}

