import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Orden, Respuesta, Empleado, Cliente } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-modificar-orden',
  templateUrl: './modificar-orden.component.html',
  styleUrls: ['./modificar-orden.component.css']
})
export class ModificarOrdenComponent implements OnInit {

  orden: Orden = {
    cliente:'',
    empleado:'',
    fecha_creacion: null

  }

  nombreCliente:String;
  nombreEmpleado:String;
  clavesClientes: String[];
  clavesEmpleados:String[];
  mensajeCliente:boolean;
  mensajeEmpleado:boolean;

  constructor(private ordenesService: OrdenesService, private activatedRoute: ActivatedRoute,
    private clientesService:ClientesService, private empleadosService:EmpleadosService, private router:Router ) { 
      this.clientesService.getClientes()
      .subscribe(
        (data:Respuesta) => this.clavesClientes = data.clientes.map(
                                                  (cliente:Cliente) => cliente.id
        )
      )

      this.empleadosService.getEmpleados()
      .subscribe(
        (data:Respuesta) => this.clavesEmpleados = data.empleados.map(
          (empleado:Empleado) => empleado.id
        )
      )

      this.activatedRoute.params.subscribe(
        (parametros) => {
          let id = parametros['id'];
          this.ordenesService.getOrden(id).subscribe(
            (data:Respuesta) => {
              let orden:any = data.orden;
              this.orden = orden;
              this.orden.id = orden.id;
              this.orden.cliente = orden.id_cliente;
              this.orden.empleado = orden.id_empleado;
              this.clientesService.getCliente(this.orden.cliente)
                  .subscribe(
                    (data:Respuesta) => this.nombreCliente = data.cliente.nombre.concat(' '+data.cliente.ap_paterno + ' '+ data.cliente.ap_materno)
                  )
              
              this.empleadosService.getEmpleado(this.orden.empleado)
                    .subscribe(
                      (data:Respuesta) => this.nombreEmpleado = data.empleado.nombre.concat(' '+data.empleado.ap_paterno + ' '+data.empleado.ap_materno)
                    )
            }
          )
        }
      )
  }

  modificarOrden(){
    this.ordenesService.modificarOrden(this.orden.id, this.orden ).subscribe(
      (data) => this.router.navigate(['/'])
    )
  }

  changeCliente(el):void {
    if (this.orden.cliente.length >= 5) {
        if(this.clavesClientes.includes(this.orden.cliente)) {
          this.clientesService.getCliente(this.orden.cliente)
              .subscribe(
                (data:Respuesta) => this.nombreCliente = data.cliente.nombre
              )
          el.focus();
          this.mensajeCliente = false;
        } else {
          this.mensajeCliente = true;
          this.orden.cliente = '';
          return;
        }
    }
    if (this.orden.cliente.charAt(this.orden.cliente.length-1)  === '0' && this.orden.cliente.length <= 5) {
      return
    } 
    if(!Number(this.orden.cliente.charAt(this.orden.cliente.length-1)) || this.orden.cliente.length > 5){
      this.orden.cliente = this.orden.cliente.slice(0,this.orden.cliente.length-1);
    }
  }

  changeEmpleado(el):void {
    if (this.orden.empleado.length >= 5) {
         if(this.clavesEmpleados.includes(this.orden.empleado)){
           this.empleadosService.getEmpleado(this.orden.empleado)
              .subscribe(
                (data:Respuesta) => this.nombreEmpleado = data.empleado.nombre
              )
            el.focus();
            this.mensajeEmpleado = false;
         } else {
           this.mensajeEmpleado = true;
           this.orden.empleado = '';
         }
    }
    if (this.orden.empleado.charAt(this.orden.empleado.length-1)  === '0' && this.orden.empleado.length <= 5) {
      return
    } 
    if(!Number(this.orden.empleado.charAt(this.orden.empleado.length-1)) || this.orden.empleado.length > 5){
      this.orden.empleado = this.orden.empleado.slice(0,this.orden.empleado.length-1);
    }
  }

  ngOnInit() {
  }
  
  noNegatives(event)
  {   
     let k;  
     k = event.charCode;
     console.log((Number(event.key)));
     if (Number(event.key) < 0) {
       return false;
     }
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
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
