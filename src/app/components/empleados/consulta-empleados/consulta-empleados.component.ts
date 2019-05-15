import { Component, OnInit } from '@angular/core';
import { Empleado, Respuesta } from 'src/app/interfaces/interfaces';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-consulta-empleados',
  templateUrl: './consulta-empleados.component.html',
  styleUrls: ['./consulta-empleados.component.css']
})
export class ConsultaEmpleadosComponent implements OnInit {

  empleados:Empleado[];
  mostrarResultados:boolean = false;
  empleadosBuscados:Empleado[];
  terminoBuscado:string;

  constructor(private empleadosService:EmpleadosService) { 
      this.empleadosService.getEmpleados()
          .subscribe(
            (data:Respuesta) =>  this.empleados = data.empleados
          )
  }

  ngOnInit() {
  }

  buscar():void {
    this.mostrarResultados = true;
  }

  refrescarBusqueda():void {
    this.empleadosBuscados = this.empleados.filter(
        (empleado) => empleado.nombre.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )
  }


}
