import { Component, OnInit } from '@angular/core';
import { Empleado, Respuesta } from 'src/app/interfaces/interfaces';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { comprobarDatosQueNoEstenVacios } from 'src/app/funciones';

@Component({
  selector: 'app-modificar-empleado',
  templateUrl: './modificar-empleado.component.html',
  styleUrls: ['./modificar-empleado.component.css']
})
export class ModificarEmpleadoComponent implements OnInit {
  empleado:Empleado;
  nombre:string;
  apPaterno:string;
  apMaterno:string;
  mensaje:String;
  listaDeEmpleados:Empleado[];

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
                console.log(this.empleado);
                this.empleadoService.getEmpleados()
                    .subscribe(
                      (respuesta:Respuesta) => this.listaDeEmpleados = respuesta.empleados.filter(
                        (empleado: Empleado) => {
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
                    )
              }
            )
      }
    )
   }

  ngOnInit() {
  }

  modificar():void {
    let camposVacios = comprobarDatosQueNoEstenVacios(this.empleado);
    if(camposVacios.length <= 0) {
      this.empleadoService.modificarEmpleado(this.empleado.id, this.empleado)
          .subscribe(
            (data:Respuesta) => this.router.navigate(['busqueda/empleados/modificaciones']),
            (data:Respuesta) => this.showMessage(data.error.mensaje)
          )
    } else {
      this.showMessage('Campos vacios: '+camposVacios.join(' ,'));
    }
  }


 siguiente():void {
  if(this.listaDeEmpleados.length > 1){
   this.router.navigate(['empleados/modificaciones',this.apPaterno,this.apMaterno, this.nombre, this.listaDeEmpleados[1].id]);
  }
}

anterior():void{
 if(this.listaDeEmpleados.length > 0){
   this.router.navigate(['empleados/modificaciones',this.apPaterno,this.apMaterno, this.nombre, this.listaDeEmpleados[0].id]);
 }
}

showMessage(mensaje:String):void{
 this.mensaje = mensaje;
 setTimeout(() => {
   this.mensaje = '';
 }, 3000);
}

}
