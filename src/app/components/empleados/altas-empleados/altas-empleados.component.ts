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

  empleado:Empleado = {
    id:'',
    nombre:'',
    ap_paterno:'',
    ap_materno:''
  }

  mensaje:String;

  constructor(private empleadosService:EmpleadosService) { }

  ngOnInit() {
  }

  alta(forma:NgForm){
    this.empleado.id = arreglarId(this.empleado.id);
    let camposVacios = comprobarDatosQueNoEstenVacios(this.empleado);
    if(camposVacios.length <=0) {
        this.empleadosService.agregarEmpleado(this.empleado)
            .subscribe(
              (data) => this.limpiarDatos(),
              (data:Respuesta) => {
                this.showMessage(data.error.mensaje);
                this.empleado.id = '';
              }
            )
    } else {
      this.showMessage('Campos vacios: '+camposVacios.join(', '));
    }
  }

  changeID():void{
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
