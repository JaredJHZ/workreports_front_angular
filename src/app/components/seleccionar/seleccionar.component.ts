import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Respuesta } from 'src/app/interfaces/interfaces';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-seleccionar',
  templateUrl: './seleccionar.component.html',
  styleUrls: ['./seleccionar.component.css']
})
export class SeleccionarComponent implements OnInit {

  items:any[] = [];
  paginasTotales: number;
  paginaActual:number = 1;
  tipo:string;
  actuales:any[] = [];
  accion:string;
  

  constructor(private activatedRoute: ActivatedRoute, private materialesService: MaterialesService
    , private direccionesService: DireccionesService, private usuariosService: UsuariosService,
    private empleadosService:EmpleadosService, private clientesService: ClientesService
    ) {
    this.activatedRoute.params.subscribe((data) => {
        this.tipo = data['tipo'];
        this.accion = data['accion'];
        this.completar();
      
    });
   }

  ngOnInit() {
  }

  completar(){
        if(this.tipo === 'Materiales') {
          this.materialesService.getTodosMateriales().subscribe(
            (respuesta:Respuesta) => {
              this.items = respuesta.materiales;
              this.paginasTotales = respuesta.materiales.length / 4;
              this.paginasTotales = (respuesta.materiales.length % 4 !== 1 ? this.paginasTotales + 1 : this.paginasTotales );
              this.paginar();
            }
          )


      } else if (this.tipo === 'Direcciones'){
        this.direccionesService.getDirecciones().subscribe(
          (respuesta:Respuesta) => {
            this.items = respuesta.direcciones;
            this.paginasTotales = respuesta.direcciones.length / 4;
            this.paginasTotales = (respuesta.direcciones.length % 4 !== 1 ? this.paginasTotales + 1 : this.paginasTotales );
            this.paginar();
          }
        )


      } else if (this.tipo === 'Usuarios') {
        this.usuariosService.getUsuarios().subscribe(
          (respuesta: Respuesta) => {
            console.log(respuesta);
            this.items = respuesta.usuarios;
            this.paginasTotales = respuesta.usuarios.length / 4;
            this.paginasTotales = (respuesta.usuarios.length % 4 !== 1 ? this.paginasTotales + 1 : this.paginasTotales );
            this.paginar();
          }
        )


      } else if (this.tipo === 'Empleados') {
        this.empleadosService.getEmpleados().subscribe(
          (respuesta: Respuesta) => {
            this.items = respuesta.empleados;
            this.paginasTotales = respuesta.empleados.length / 4;
            this.paginasTotales = (respuesta.empleados.length % 4 !== 0 ? this.paginasTotales + 1 : this.paginasTotales );
            this.paginar();
          }
        )


      } else if (this.tipo === 'Clientes') {
        this.clientesService.getClientes()
          .subscribe(
            (respuesta: Respuesta) => {
              this.items = respuesta.clientes;
              this.paginasTotales = respuesta.clientes.length / 4;
              this.paginasTotales = (respuesta.clientes.length % 4 !== 1 ? this.paginasTotales + 1 : this.paginasTotales );
              this.paginar();
          })
        }

      }

  paginar() {
      let li = (this.paginaActual === 1 ? 1 : this.paginaActual * 4 - 3);
      let ls = li + 3;
      this.actuales = this.items.filter(
      ( tarea, idx) => idx+1 >= li && idx+1 <= ls
    )

  }


  siguiente() {
    this.paginaActual = (this.paginaActual + 1 <= this.paginasTotales ? this.paginaActual + 1 : 1);
    this.paginar();
  }

  anterior() {
    this.paginaActual = (this.paginaActual - 1 === 0 ? 1 : this.paginaActual - 1 );
    this.paginar();
  }

 

}
