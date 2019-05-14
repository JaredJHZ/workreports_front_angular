import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ActivatedRoute } from '@angular/router';
import { Respuesta, Orden } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-consultar-orden',
  templateUrl: './consultar-orden.component.html',
  styleUrls: ['./consultar-orden.component.css']
})
export class ConsultarOrdenComponent implements OnInit {

  id:string;
  orden: Orden;
  tipoDeConsulta:string="1";
  cliente:String;
  empleado:String;


  constructor(private ordenService: OrdenesService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params
        .subscribe(
          (parametros) => {
            this.id = parametros.id
            this.ordenService.getOrden(this.id)
                .subscribe(
                  (data: Respuesta) => {
                    this.orden = data.orden
                    this.cliente = this.orden.cliente;
                    this.empleado = this.orden.empleado;
                    this.orden.cliente = '';
                    this.orden.empleado = '';
                  }
                )
          }
        )
       
  }

  generatePDF():void{
    
    this.ordenService.generatePDF(this.id);
  
  }

  actualizar():void{
    if(this.tipoDeConsulta === '1') {
      this.orden.empleado = '';
      this.orden.cliente = '';
    }else if (this.tipoDeConsulta === '2') {
      this.orden.cliente = this.cliente;
    } else {
      this.orden.cliente = this.cliente;
      this.orden.empleado = this.empleado;
    }
  }
  

  ngOnInit() {
  }

}
