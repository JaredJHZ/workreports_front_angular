import { Component, OnInit } from '@angular/core';
import { MaterialesParaOrden, Orden, Cliente, Empleado, Tarea, Material, Respuesta } from 'src/app/interfaces/interfaces';
import { comprobarDatosQueNoEstenVacios, arreglarId } from 'src/app/funciones';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-alta-ordenes',
  templateUrl: './alta-ordenes.component.html',
  styleUrls: ['./alta-ordenes.component.css']
})
export class AltaOrdenesComponent implements OnInit {

  numeroMaterial:number = 0;
  numeroTarea:number = 0;

  materiales:MaterialesParaOrden[] = [{id:'',cantidad_estimada:null,cantidad_utilizada:null}];

  tareas:any [] = [{id:''}];

  mensaje:String;
  mensajeClave:boolean = false;
  mensajeCliente:boolean = false;
  mensajeEmpleado:boolean = false;
  mensajeMaterial:boolean = false;
  mensajeTarea:boolean = false;

  clavesClientes: String[];
  clavesEmpleados:String[];
  clavesTareas:String[];
  clavesOrdenes:String[];
  clavesMateriales:String[];
  nombreCliente:String;
  nombreEmpleado:String;
  nombreMaterial:String;
  nombreTarea:String;

  orden:Orden = {
    id:'',
    cliente:'',
    empleado:'',
    calle:'',
    ciudad:'',
    estado:'',
    cp:'',
    fecha_creacion:new Date,
    fecha_requerida: null,
    fecha_termino:null
  };

  constructor(private ordenesService:OrdenesService, private router:Router,
    private clientesService:ClientesService, private empleadosService:EmpleadosService,
    private materialesService:MaterialesService, private tareasService:TareasService) {

      

      this.ordenesService.getAllOrdenes()
                            .subscribe(
                              (data:Respuesta) => this.clavesOrdenes = data.ordenes
                                                                .map(
                                                                  (orden:Orden) => orden.id
                                                                ),
                              (error) => this.clavesEmpleados = []
                            )
      

      this.clientesService.getClientes()
            .subscribe(
              (data:Respuesta) => this.clavesClientes = data.clientes.map(
                                                        (cliente:Cliente) => cliente.id
              )
            )

      this.tareasService.getAll()
                .subscribe(
                  (data:Respuesta) => this.clavesTareas = data.tareas.map(
                    (tarea:Tarea) => tarea.id
                  )
                )

      this.materialesService.getTodosMateriales()
                  .subscribe(
                    (data:Respuesta) => this.clavesMateriales = data.materiales.map(
                      (material:Material) => material.id
                    )
                  )

      this.empleadosService.getEmpleados()
                    .subscribe(
                      (data:Respuesta) => this.clavesEmpleados = data.empleados.map(
                        (empleado:Empleado) => empleado.id
                      )
                    )

      
     
      


    
  }

  altaYBloquear(clave,cliente,empleado,fecha1,fecha2,calle,ciudad,estado, cp):void {
    clave.disabled = true;
    cliente.disabled = true;
    empleado.disabled = true;
    fecha1.disabled = true;
    fecha2.disabled = true;
    calle.disabled = true;
    ciudad.disabled = true;
    estado.disabled = true;
    cp.disabled = true;
  }

  ngOnInit() {
  }

  changeTarea():void {
    if (this.tareas[this.numeroTarea].id.length >= 5) {
      if (!this.comprobarTareas()) {
        this.tareas[this.numeroTarea].id = '';
        this.mensajeTarea = true;
      } else {
        this.tareasService.getTarea(this.tareas[this.numeroTarea].id)
            .subscribe(
              (data:Respuesta) => {
                this.nombreTarea = data.tarea.nombre;
                this.mensajeTarea = false;
              }
            )
      }
    }
    if (this.tareas[this.numeroTarea].id.charAt(this.tareas[this.numeroTarea].id.length-1)  === '0' && this.tareas[this.numeroTarea].id.length <= 5) {
      return
    } 
    if(!Number(this.tareas[this.numeroTarea].id.charAt(this.tareas[this.numeroTarea].id.length-1)) || this.tareas[this.numeroTarea].id.length > 5) {
      this.tareas[this.numeroTarea].id = this.tareas[this.numeroTarea].id.slice(0, this.tareas[this.numeroTarea].id.length - 1);
    }
  }

  changeID(el):void{
    if (this.orden.id.length >= 5 ){
      if (this.clavesOrdenes == undefined) {
        el.focus();
        return;
      } else if (this.clavesOrdenes.includes(this.orden.id)){
        this.mensajeClave = true;
        this.orden.id = '';
        return
      } else {
        this.mensajeClave = false;
        el.focus();
      }
    }
    if (this.orden.id.charAt(this.orden.id.length-1)  === '0' && this.orden.id.length <= 5) {
      return
    } 
    if(!Number(this.orden.id.charAt(this.orden.id.length-1)) || this.orden.id.length > 5){
      this.orden.id = this.orden.id.slice(0,this.orden.id.length-1);
    }
  }

  changeCliente(el):void {
    if (this.orden.cliente.length >= 5) {
        if(this.clavesClientes.includes(this.orden.cliente)) {
          this.clientesService.getCliente(this.orden.cliente)
              .subscribe(
                (data:Respuesta) => {
                  this.nombreCliente = data.cliente.nombre;
                  this.mensajeCliente = false;
                }
              )
          el.focus();
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
                (data:Respuesta) => {
                  this.nombreEmpleado = data.empleado.nombre;
                  this.mensajeEmpleado = false;
                }
              )
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

  changeCP():void {
    if (this.orden.cp.charAt(this.orden.cp.length-1)  === '0' && this.orden.cp.length <= 5) {
      return
    } 
    if(!Number(this.orden.cp.charAt(this.orden.cp.length-1)) || this.orden.cp.length > 5){
      this.orden.cp = this.orden.cp.slice(0,this.orden.cp.length-1);
    }
  }

  changeMaterialID(el):void {
    if(this.materiales[this.numeroMaterial].id.length >= 5) {
      if(this.comprobarMateriales()){
        this.materialesService.getMaterial(this.materiales[this.numeroMaterial].id)
            .subscribe(
              (data:Respuesta) => {
                this.nombreMaterial = data.material.nombre;
                this.mensajeMaterial = false;
              }
            )
        el.focus();
      } else {
       this.mensajeMaterial = true;

       this.materiales[this.numeroMaterial].id = '';
      }

    }
    if (this.materiales[this.numeroMaterial].id.charAt(this.materiales[this.numeroMaterial].id.length-1)  === '0' && this.materiales[this.numeroMaterial].id.length <= 5) {
      return
    } 
    if(!Number(this.materiales[this.numeroMaterial].id.charAt(this.materiales[this.numeroMaterial].id.length-1)) || this.materiales[this.numeroMaterial].id.length > 5){
      this.materiales[this.numeroMaterial].id = this.materiales[this.numeroMaterial].id.slice(0,this.materiales[this.numeroMaterial].id.length-1);
    }
  }

  agregarMaterial():void {
    let auxiliar:MaterialesParaOrden = {
      id:null,
      cantidad_estimada:null,
      cantidad_utilizada:null
    }
    this.materiales.push(auxiliar);
    this.numeroMaterial += 1;
  }

  borrarMaterial(i) {
      if(this.materiales.length <= 1) {
        this.showMessage("Se debe de tener al menos un material en la orden");
        return false;
      }
      this.materiales = this.materiales.filter(
        (material,index) => index !== i
      )
  }

  agregarTarea():void {
    let newTarea = {
      id:''
    };
    this.tareas.push(newTarea);
    this.numeroTarea += 1;
  }

  borrarTarea(i) {
    if(this.tareas.length <= 1) {
      this.showMessage("Se debe de terner al menos una tarea en la orden");
      return false;
    }
    this.tareas = this.tareas.filter(
      (tarea,index) => index !== i
    )
  }

  showMessage(mensaje:String):void {
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  agregarOrden():void {
    this.orden.materiales = this.materiales;
    this.orden.id = arreglarId(this.orden.id);
    let camposVacios = comprobarDatosQueNoEstenVacios(this.orden);
    if (camposVacios.length <= 0) {
      if (this.comprobarTareas()) {
        this.orden.tareas = this.llenarTareas();
        if (this.comprobarMateriales()) {
          this.ordenesService.agregarOrden(this.orden)
              .subscribe(
                (data) => this.router.navigate(['/']),
                (data:Respuesta) => this.showMessage(data.error.mensaje)
              )
        } else {
          this.showMessage('Algun material no existe!')
        }
      } else {
        this.showMessage('Alguna tarea no existe!');
      }
    } else {
      this.showMessage('Campos vacios: '+camposVacios.join(' ,'));
    }
  }

  llenarTareas():String[] {
    let tareas:String[] = [];
    for (let i = 0; i < this.tareas.length ; i ++) {
        tareas.push(this.tareas[i].id);
    }
    return tareas;
  }

  comprobarTareas():boolean {
    let encontrados:number = 0;
    for(let i = 0 ; i<this.tareas.length ; i++) {
        for(let j = 0 ; j<this.clavesTareas.length ; j++){
            if(this.clavesTareas[j] === this.tareas[i].id) {
              encontrados+=1;
              break;
            }
        }
    }
    return encontrados === this.tareas.length;
  }

  comprobarMateriales():boolean {
    let encontrados:number = 0;
    for(let i = 0 ; i < this.materiales.length ; i++) {
      for(let j = 0 ; j < this.clavesMateriales.length ; j++) {
        if (this.clavesMateriales[j] === this.materiales[i].id) {
          encontrados+=1;
          break;
        }
      }
    }
    
    return encontrados === this.materiales.length;
  }


}
