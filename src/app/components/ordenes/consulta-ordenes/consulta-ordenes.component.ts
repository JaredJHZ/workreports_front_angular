import { Component, OnInit } from '@angular/core';
import { Orden, Respuesta } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-consulta-ordenes',
  templateUrl: './consulta-ordenes.component.html',
  styleUrls: ['./consulta-ordenes.component.css']
})
export class ConsultaOrdenesComponent implements OnInit {

  ordenes:Orden[];
  mostrarResultados:boolean = false;
  ordenesBuscadas:Orden[];
  terminoBuscado:string;
  mensaje:String;

  constructor(private router:Router, private ordenesService:OrdenesService) { 
    this.ordenesService.getAllOrdenes()
        .subscribe(
          (data:Respuesta) => {
            this.ordenes = data.ordenes;
          }
        )
  }

  limpiar():void {
    this.terminoBuscado = '';
    this.ordenesBuscadas = [];
    this.mostrarResultados = false;
  }

  buscar():void {
    if (this.ordenesBuscadas.length <= 0) {
      this.showMessage('No existen ordenes con esa clave');
      return;
    }
    this.mostrarResultados = true;
  }

  refrescarBusqueda():void {
    this.ordenesBuscadas = this.ordenes.filter(
        (orden) => orden.id.includes(this.terminoBuscado)
    )
  }

  ngOnInit() {
  }

  changeID():void{
    if (this.terminoBuscado.charAt(this.terminoBuscado.length-1)  === '0' && this.terminoBuscado.length <= 5) {
      return
    } 
    if(!Number(this.terminoBuscado.charAt(this.terminoBuscado.length-1)) || this.terminoBuscado.length > 5){
      this.terminoBuscado = this.terminoBuscado.slice(0,this.terminoBuscado.length-1);
    }
  }

  reporte(id):void {
    this.router.navigate(['reporte/orden', id]);
  }


  showMessage(mensaje:String):void {
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }


}
