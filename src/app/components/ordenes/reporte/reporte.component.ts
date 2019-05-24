import { Component, OnInit } from '@angular/core';
import { Respuesta, Orden } from 'src/app/interfaces/interfaces';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  id:string;
  orden: Orden;
  tipoDeConsulta:string="1";
  cliente:String;
  empleado:String;


  constructor(private ordenService: OrdenesService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params
        .subscribe(
          (parametros) => {
            this.id = parametros.id;
            let tipo = parametros.tipo;
            if (tipo === 'cliente') {
              this.tipoDeConsulta = '2';
            } else {
              this.tipoDeConsulta = '3';
            }
            this.ordenService.getOrden(this.id)
                .subscribe(
                  (data: Respuesta) => {
                    this.orden = data.orden
                    this.cliente = this.orden.cliente;
                    this.empleado = this.orden.empleado;
                    this.orden.cliente = '';
                    this.orden.empleado = '';
                    this.actualizar();
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
