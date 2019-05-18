import { Component, OnInit } from '@angular/core';
import { Empleado, Respuesta } from 'src/app/interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-busqueda-empleados',
  templateUrl: './busqueda-empleados.component.html',
  styleUrls: ['./busqueda-empleados.component.css']
})
export class BusquedaEmpleadosComponent implements OnInit {

  nombreEmpleado:string='';
  apellidoPEmpleado:string='';
  apellidoMEmpleado:string='';
  empleados: Empleado[];
  listaDeEmpleados:Empleado[];
  mensaje:String;
  tipo:string;

  constructor(private router:Router, private empleadosService:EmpleadosService, private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.params.subscribe(
      (params) => {
        this.tipo = params['tipo'];
      }
    )
    this.empleadosService.getEmpleados()
        .subscribe(
          (data:Respuesta) => this.listaDeEmpleados = data.empleados
        )
  }

  ngOnInit() {
  }

  cambiarBusqueda():void{
    this.empleados = this.listaDeEmpleados.filter(
      (empleado) => {

          if (this.nombreEmpleado.toUpperCase() === empleado.nombre.toUpperCase() ) {
            if (this.apellidoPEmpleado.toUpperCase()  === empleado.ap_paterno.toUpperCase() ){
              if (this.apellidoMEmpleado.toUpperCase()  === empleado.ap_materno.toUpperCase() ) {
                return true;
              }
            }
          }

          return false;
      }
    )

  }

  busqueda(el):void {
  
    if (this.empleados === undefined || this.empleados.length <= 0) {
      this.showMessage("No existen empleados con ese termino de busqueda");
      this.nombreEmpleado = '';
      this.apellidoPEmpleado = '';
      this.apellidoMEmpleado = '';
      el.focus();
    } else {
      this.router.navigate(['empleados',this.tipo,this.apellidoPEmpleado,this.apellidoMEmpleado, this.nombreEmpleado, this.empleados[0].id]);
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

}
