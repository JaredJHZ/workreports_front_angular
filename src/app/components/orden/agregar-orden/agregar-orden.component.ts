import { Component, OnInit } from '@angular/core';
import { Orden, Direccion, Cliente, Empleado, Respuesta, Material, Tarea , MaterialesParaOrden} from 'src/app/interfaces/interfaces';
import { OwlDateTimeComponent } from 'ng-pick-datetime';
import { NgForm } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-agregar-orden',
  templateUrl: './agregar-orden.component.html',
  styleUrls: ['./agregar-orden.component.css']
})
export class AgregarOrdenComponent implements OnInit {

  mensaje:string;


  opciones: String [] = ['id','cliente','empleado','direccion'];

  direcciones: Direccion[];
  clientes: Cliente[];
  empleados:Empleado[];
  materiales: Material[];
  tareas: Tarea[];
  materialesParaOrden: MaterialesParaOrden[]


  orden: Orden = {
    id:'',
    cliente:'',
    fecha_creacion:new Date(),
    fecha_requerida:null,
    fecha_termino:null,
    empleado:'SIN ASIGNAR',
    direccion:'',
    materiales:[],
    tareas:[],
    lista_de_materiales:Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
    serie_de_tareas: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
  }

  constructor(private empleadoService: EmpleadosService,private clienteService: ClientesService,private direccionesService: DireccionesService
    ,private materialesService: MaterialesService,private tareasService: TareasService, private ordenesService: OrdenesService) {
        
        this.empleadoService.getEmpleados()
            .subscribe(
              (respuesta:Respuesta) => this.empleados = respuesta.empleados
            )
      
        this.direccionesService.getDirecciones()
            .subscribe(
              (respuesta:Respuesta) => this.direcciones = respuesta.direcciones
            )

        this.clienteService.getClientes()
            .subscribe(
              (respuesta:Respuesta) => this.clientes = respuesta.clientes
            )

        this.materialesService.getTodosMateriales()
            .subscribe(
              (respuesta: Respuesta) => this.materiales = respuesta.materiales.map((material:Material) => {
                material['cantidad'] = 0;
                return material
              }
              )
            )
        
        this.tareasService.getAll()
            .subscribe(
              (respuesta: Respuesta) => this.tareas = respuesta.tareas
            )
        
    
  }

  ngOnInit() {
  }

  selected(material: Material) {
    if (material.cantidad <= 0) {
      return false;
    }
    this.orden.materiales.push({
      id:material.id,
      cantidad:material.cantidad
    });
    
  }

  unselect(material: Material) {
    let materialABorrar = {
      id:material.id,
      cantidad:material.cantidad
    };
    this.orden.materiales = this.orden.materiales.filter(
      materialActual => {
        return materialABorrar.id !== materialABorrar.id
      }
    );
  }

  selectTarea(tarea:Tarea) {

    this.orden.tareas.push(tarea.id);

  }

  unselectTarea(tarea:Tarea){
    this.orden.tareas = this.orden.tareas.filter(
      tareaActual => {
        return tarea.id !== tareaActual
      }
    );
    console.log(this.orden.tareas);
  }

  materialEstaEnMateriales(id) {
    let si = false;
    this.orden.materiales.map(
      (material) => {
        if (si === false) {
          si = material.id === id;
        }
      }
    );

    return si;
  }

  tareaEnTareas(id:String) {
    let si = false;
    this.orden.tareas.map(
      (tarea) => {
        if (si === false) {
          si = tarea === id;
        }
      }
    );

    return si;
  }
  

  guardar(forma: NgForm) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¿Desea realizar la operación?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "aceptar"
    }).then(
      (ok) => {
        this.ordenesService.agregarOrden(this.orden)
            .subscribe(
              (data: Respuesta) => {
                this.invocarMensaje(data.mensaje)
                this.borrarInformacion();
              }
            )
      }
    )
  }

  invocarMensaje(mensaje):void{
    // Funcion que permite mandar un sweetalert con informacion e invoca a la funcion que limpia el formulario
   Swal.fire(
     mensaje
   )
   this.mensaje = null;
  };

  borrarInformacion():void {
    this.orden = {
      id:'',
      cliente:'',
      fecha_creacion:new Date(),
      fecha_requerida:null,
      fecha_termino:null,
      empleado:'SIN ASIGNAR',
      direccion:'',
      materiales:[],
      tareas:[],
      lista_de_materiales:Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
      serie_de_tareas: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    }
    this.mensaje = null;
  }

}
