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

  materiales:MaterialesParaOrden[] = [{id:'',cantidad_estimada:null,cantidad_utilizada:null}];

  tareas:any [] = [{id:''}];

  mensaje:String;

  clavesClientes: String[];
  clavesEmpleados:String[];
  tareasDisponibles: Tarea[];
  materialesDisponibles: Material[];
  clavesOrdenes:String[];

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
      
      this.materialesService.getTodosMateriales()
          .subscribe(
            (data:Respuesta) => this.materialesDisponibles = data.materiales
          )

      this.clientesService.getClientes()
            .subscribe(
              (data:Respuesta) => this.clavesClientes = data.clientes.map(
                                                        (cliente:Cliente) => cliente.id
              )
            )

      this.tareasService.getAll()
            .subscribe(
              (data:Respuesta) => this.tareasDisponibles = data.tareas
            )
      
      this.empleadosService.getEmpleados()
              .subscribe(
                (data:Respuesta) => this.clavesEmpleados = data.empleados
                                                              .map(
                                                                (empleado:Empleado) => empleado.id
                                                              )
              )

    
  }

  ngOnInit() {
  }

  changeTarea(i):void {
    if (this.tareas[i].id.charAt(this.tareas[i].id.length-1)  === '0' && this.tareas[i].id.length <= 5) {
      return
    } 
    if(!Number(this.tareas[i].id.charAt(this.tareas[i].id.length-1)) || this.tareas[i].id.length > 5) {
      this.tareas[i].id = this.tareas[i].id.slice(0, this.tareas[i].id.length - 1);
    }
  }

  changeID(el):void{
    if (this.orden.id.length >= 5 ){
      if (this.clavesOrdenes === undefined) {
        el.focus();
      }
      if (this.clavesOrdenes.includes(this.orden.id)){
        this.showMessage('Clave de orden en uso!');
        this.orden.id = '';
        return
      } else {
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
          el.focus();
        } else {
          this.showMessage('Ese cliente no existe!');
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
        if(this.clavesEmpleados.includes(this.orden.empleado)) {
          el.focus();
        } else {
          this.orden.empleado = '';
          this.showMessage('El empleado no existe!');
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

  changeMaterialID(i):void {
    if (this.materiales[i].id.charAt(this.materiales[i].id.length-1)  === '0' && this.materiales[i].id.length <= 5) {
      return
    } 
    if(!Number(this.materiales[i].id.charAt(this.materiales[i].id.length-1)) || this.materiales[i].id.length > 5){
      this.materiales[i].id = this.materiales[i].id.slice(0,this.materiales[i].id.length-1);
    }
  }

  agregarMaterial():void {
    let auxiliar:MaterialesParaOrden = {
      id:null,
      cantidad_estimada:null,
      cantidad_utilizada:null
    }
    this.materiales.push(auxiliar);
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
        for(let j = 0 ; j<this.tareasDisponibles.length ; j++){
            if(this.tareasDisponibles[j].id === this.tareas[i].id) {
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
      for(let j = 0 ; j < this.materialesDisponibles.length ; j++) {
        if (this.materialesDisponibles[j].id === this.materiales[i].id) {
          encontrados+=1;
          break;
        }
      }
    }
    
    return encontrados === this.materiales.length;
  }

}
