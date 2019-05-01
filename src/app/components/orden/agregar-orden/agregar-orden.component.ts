import { Component, OnInit } from '@angular/core';
import { Orden, Direccion, Cliente, Empleado, Respuesta, Material, Tarea , MaterialesParaOrden} from 'src/app/interfaces/interfaces';
import { OwlDateTimeComponent } from 'ng-pick-datetime';
import { NgForm } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import { TareasService } from 'src/app/services/tareas.service';

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
    lista_materiales:[],
    tareas:[]
  }

  constructor(private empleadoService: EmpleadosService,private clienteService: ClientesService,private direccionesService: DireccionesService
    ,private materialesService: MaterialesService,private tareasService: TareasService) {
        
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
    this.orden.lista_materiales.push({
      id:material.id,
      cantidad:material.cantidad
    });
    
  }

  unselect(material: Material) {
    let materialABorrar = {
      id:material.id,
      cantidad:material.cantidad
    };
    this.orden.lista_materiales = this.orden.lista_materiales.filter(
      materialActual => {
        return materialABorrar.id !== materialABorrar.id
      }
    );
  }

  selectTarea(tarea:Tarea) {

    this.orden.tareas.push(tarea.id);

  }

  unselectTarea(id:String){
    this.orden.tareas = this.orden.tareas.filter(
      tareaActual => {
        return id !== tareaActual
      }
    );
  }

  materialEstaEnMateriales(id) {
    let si = false;
    this.orden.lista_materiales.map(
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
    console.log(this.orden);
  }

}
