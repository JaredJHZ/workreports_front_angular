import { Component, OnInit } from '@angular/core';
import { Empleado, Respuesta } from 'src/app/interfaces/interfaces';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-baja-empleados',
  templateUrl: './baja-empleados.component.html',
  styleUrls: ['./baja-empleados.component.css']
})
export class BajaEmpleadosComponent implements OnInit {

  empleado:Empleado;
  nombre:string;
  apPaterno:string;
  apMaterno:string;
  mensaje:String;
  listaDeEmpleados:Empleado[];
  boton1:String = 'Anterior';
  boton2:String = 'Siguiente';

  constructor(private empleadoService:EmpleadosService, private activatedRoute:ActivatedRoute, private router:Router) { 
    this.activatedRoute.params.subscribe(
      (params) => {
        this.apPaterno = params['apellidop'];
        this.apMaterno = params['apellidom'];
        this.nombre = params['nombre']
        this.empleadoService.getEmpleado(params['id'])
            .subscribe(
              (data:Respuesta) => {
                this.empleado = data.empleado;
                this.empleadoService.getEmpleados()
                    .subscribe(
                      (respuesta:Respuesta) => {
                        this.listaDeEmpleados = respuesta.empleados.filter(
                        (empleado: Empleado) => {
                          if (this.empleado.id === empleado.id) {
                            return false;
                          }
                          if (this.nombre.toUpperCase() === empleado.nombre.toUpperCase() ) {
                            if (this.apPaterno.toUpperCase()  === empleado.ap_paterno.toUpperCase() ){
                              if (this.apMaterno.toUpperCase()  === empleado.ap_materno.toUpperCase() ) {
                                return true;
                              }
                            }
                          }
          
                          return false;
                        }
                      )
                      if (this.listaDeEmpleados.length <= 0) {
                        this.boton1 = 'Cancelar';
                        this.boton2 = 'Eliminar';
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

  b1Handler():void {
    if (this.boton1.includes('Cancelar')) {
      this.router.navigate(['/']);
    } else {
      this.anterior();
    }
  }

  b2Handler():void {
    if(this.boton2.includes('Eliminar')) {
      this.borrar();
    } else {
      this.siguiente();
    }
  }

  borrar():void {
    this.empleadoService.eliminarEmpleado(this.empleado.id)
        .subscribe(
          (data) => this.router.navigate(['busqueda/empleadas/bajas']),
          (data:Respuesta) => this.showMessage(data.error.mensaje)
        )
 }
 

 siguiente():void {
   if(this.listaDeEmpleados.length > 1){
    this.router.navigate(['empleados/bajas',this.apPaterno,this.apMaterno, this.nombre, this.listaDeEmpleados[1].id]);
   }
 }

 anterior():void{
  if(this.listaDeEmpleados.length > 0){
    this.router.navigate(['empleados/bajas',this.apPaterno,this.apMaterno, this.nombre, this.listaDeEmpleados[0].id]);
  }
 }

 showMessage(mensaje:String):void{
  this.mensaje = mensaje;
  setTimeout(() => {
    this.mensaje = '';
  }, 3000);
}

seleccionar():void {
  this.boton1 = "Cancelar";
  this.boton2 = "Eliminar";
  this.listaDeEmpleados = [];
}

}
