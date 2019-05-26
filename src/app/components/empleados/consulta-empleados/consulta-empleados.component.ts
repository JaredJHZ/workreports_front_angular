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
  mensaje:String;

  constructor(private empleadosService:EmpleadosService) { 
      this.empleadosService.getEmpleados()
          .subscribe(
            (data:Respuesta) =>  this.empleados = data.empleados
          )
  }

  ngOnInit() {
  }

  buscar():void {
    if(this.empleadosBuscados.length <= 0) {
      this.showMessage('Busqueda de empleos');
    } else {
      this.mostrarResultados = true;
    }

  }

  limpiar():void {
    this.mostrarResultados = false;
    this.terminoBuscado = '';
    this.empleadosBuscados = [];
  }

  refrescarBusqueda():void {
    this.empleadosBuscados = this.empleados.filter(
        (empleado) => empleado.nombre.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )
  }

  showMessage(mensaje:String):void {
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  omit_special_char(event)
  {   
     let k;  
     k = event.charCode;
     if (Number(event.key)) {
       return false;
     }
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }


}
