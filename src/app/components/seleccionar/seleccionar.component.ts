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
  paginaActual:number;
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
            (materiales:Respuesta) => {
              this.items = materiales.materiales;
              this.actuales = this.items.filter(
                (value,index) => {
                  if(index <= 3) {
                    return true;
                  }else{
                    return false
                  }
                }
              );
              this.paginasTotales = (this.items.length / 3 ) + 1;
              this.paginaActual = 1; 
            }
          )


      } else if (this.tipo === 'Direcciones'){
        this.direccionesService.getDirecciones().subscribe(
          (direcciones:Respuesta) => {
            this.items = direcciones.direcciones;
            this.actuales = this.items.filter(
              (value,index) => {
                if(index <= 2) {
                  return true;
                }else{
                  return false
                }
              }
            );
            this.paginasTotales = (this.items.length / 2 ) + 1;
            this.paginaActual = 1; 
          }
        )


      } else if (this.tipo === 'Usuarios') {
        this.usuariosService.getUsuarios().subscribe(
          (usuarios: Respuesta) => {
            this.items = usuarios.usuarios;
            this.actuales = this.items.filter(
              (value,index) => {
                if(index <= 2) {
                  return true;
                }else{
                  return false
                }
              }
            );
            this.paginasTotales = (this.items.length / 2 ) + 1;
            this.paginaActual = 1; 
          }
        )


      } else if (this.tipo === 'Empleados') {
        this.empleadosService.getEmpleados().subscribe(
          (empleados: Respuesta) => {
            this.items = empleados.empleados;
            this.actuales = this.items.filter(
              (value,index) => {
                if(index <= 2) {
                  return true;
                }else{
                  return false
                }
              }
            );
            this.paginasTotales = (this.items.length / 2 ) + 1;
            this.paginaActual = 1; 
          }
        )


      } else if (this.tipo === 'Clientes') {
        this.clientesService.getClientes()
          .subscribe(
            (clientes: Respuesta) => {
              this.items = clientes.clientes;
              this.actuales = this.items.filter(
                (value,index) => {
                  if(index <= 2) {
                    return true;
                  }else{
                    return false
                  }
                }
              );
              this.paginasTotales = (this.items.length / 2 ) + 1;
              this.paginaActual = 1; 
            }
          )
      }



  }




  siguiente() {

      if (this.paginaActual + 1 > this.paginasTotales) {
        this.paginaActual = 0;
      }

      this.paginaActual = this.paginaActual += 1;
      let limiteSuperior = 3 * this.paginaActual;
      let limiteInferior = limiteSuperior - 3;
      this.actuales = this.items.filter(
          (value,i) => {
            if (i >= limiteInferior && i<=limiteSuperior){
              return true;
            }else {
              return false;
            }
          }
      );
  }

  anterior() {
    if (this.paginaActual - 1 <= 0) {
      this.paginaActual = 1;
    }else {
      this.paginaActual = this.paginaActual -= 1;
    }
    
    let limiteSuperior = 3 * this.paginaActual;
    let limiteInferior = limiteSuperior - 3;
    this.actuales = this.items.filter(
        (value,i) => {
          if (i >= limiteInferior && i<=limiteSuperior){
            return true;
          }else {
            return false;
          }
        }
    );
  }

 

}
