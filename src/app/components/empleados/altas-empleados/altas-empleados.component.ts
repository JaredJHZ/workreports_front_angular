import { Component, OnInit } from '@angular/core';
import { Empleado, Respuesta } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { arreglarId, comprobarDatosQueNoEstenVacios } from 'src/app/funciones';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-altas-empleados',
  templateUrl: './altas-empleados.component.html',
  styleUrls: ['./altas-empleados.component.css']
})
export class AltasEmpleadosComponent implements OnInit {

  clavesDeEmpleados:String[];

  empleado:Empleado = {
    id:'',
    nombre:'',
    ap_paterno:'',
    ap_materno:''
  }

  mensaje:String;

  mensajeClave:boolean = false;

  constructor(private empleadosService:EmpleadosService) { 
    this.empleadosService.getEmpleados()
        .subscribe(
          (data:Respuesta) => {
              this.clavesDeEmpleados = data.empleados
                                            .map(
                                              (empleado:Empleado) => empleado.id
                                            )
          }
        )
  }

  ngOnInit() {
  }

  alta(forma:NgForm, el){
    this.empleado.id = arreglarId(this.empleado.id);
    let camposVacios = comprobarDatosQueNoEstenVacios(this.empleado);
    if(camposVacios.length <=0) {
        this.empleadosService.agregarEmpleado(this.empleado)
            .subscribe(
              (data) => {
                this.limpiarDatos();
                el.focus();
              },
              (data:Respuesta) => {
                this.showMessage(data.error.mensaje);
                this.empleado.id = '';
              }
            )
    } else {
      this.showMessage('Campos vacios: '+camposVacios.join(', '));
    }
  }

  changeID(e,el):void{
    if(this.empleado.id.length >= 5) {
      if (this.clavesDeEmpleados.includes(this.empleado.id)){
        this.mensajeClave = true;
        this.empleado.id = '';
        return;
      } else {
        this.mensajeClave = false;
        el.focus();
      }
      
    }
    if(this.empleado.id.charAt(this.empleado.id.length - 1) === '0' && this.empleado.id.length <=5) {
      return;
    }
    if(!Number(this.empleado.id.charAt(this.empleado.id.length-1))){
      this.empleado.id = this.empleado.id.slice(0,this.empleado.id.length-1);
    }
  }

  limpiarDatos():void{
    this.empleado = {
      id:'',
      nombre:'',
      ap_paterno:'',
      ap_materno:''
    }
  }

  showMessage(mensaje:string):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }


}
