import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Orden, Respuesta } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  tipo:String;
  terminoBuscado:string;
  listaDeOrdenes:Orden[];
  ordenes:Orden[];
  mensaje:String;


  constructor(private router:Router,private activatedRoute:ActivatedRoute, private ordenesService:OrdenesService) {
    this.activatedRoute.params.subscribe(
      params => {
        this.tipo = params['tipo'];
        this.ordenesService.getAllOrdenes()
            .subscribe(
              (data:Respuesta) => {
                this.listaDeOrdenes = data.ordenes;
              }
            )
      }
    )
   }

  ngOnInit() {
  }

  cambiarBusqueda():void{
    this.ordenes = this.listaDeOrdenes.filter(
      (orden) => orden.id.includes(this.terminoBuscado)
    )

  }

  busqueda():void {
    if ( this.ordenes === undefined || this.ordenes.length <= 0) {
      this.showMessage("No existen ordenes con esa clave");
    } else {
      this.router.navigate(['/reporte/',this.tipo,this.ordenes[0].id]);
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  changeID():void{
    if (this.terminoBuscado.charAt(this.terminoBuscado.length-1)  === '0' && this.terminoBuscado.length <= 5) {
      return
    } 
    if(!Number(this.terminoBuscado.charAt(this.terminoBuscado.length-1)) || this.terminoBuscado.length > 5){
      this.terminoBuscado = this.terminoBuscado.slice(0,this.terminoBuscado.length-1);
    }
  }


}
