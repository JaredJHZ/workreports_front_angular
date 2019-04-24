import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Respuesta, Material, Direccion, Usuario, Empleado } from 'src/app/interfaces/interfaces';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from "sweetalert2";
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  tipo: String; 
  opciones:String[] = [];
  mensaje:String;

  material: Material = {
    id:'',
    nombre:'',
    costo_unitario: 0
  }

  direccion: Direccion =  {
    id: '',
    calle:'',
    ciudad:'',
    estado:'',
    cp:''
  }

  usuario: Usuario = {
    id:'',
    usuario:'',
    password:'',
    privilegios:''
  }

  empleado: Empleado = {
    id: '',
    nombre:'',
    ap_paterno:'',
    ap_materno:'',
    direccion:''
  }

  direcciones: Direccion[] = [];



  constructor(private activatedRoute: ActivatedRoute, private materialService:MaterialesService,
     private direccionesService: DireccionesService, private usuariosService: UsuariosService,
     private empleadoService: EmpleadosService
     ) {

    this.activatedRoute.params.subscribe(
      (data) => {
        this.tipo = data.tipo;
        this.armar();
      }
    )
   }

   agregar(forma: NgForm):void {

    //Funcion que permite agregar algun tipo de dato a la base de datos
       
      Swal.fire({
        title: '¿Está seguro?',
        text: "¿Desea realizar la operación?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "aceptar"
      }).then((result) => {
        if (result.value) {


                switch (this.tipo){
                  // switch para elegir el tipo de informacion que se va a agregar
                  case 'Materiales':
            
            
                  this.material = forma.value;
                  this.material.costo_unitario = Number(this.material.costo_unitario);
                  // transformo el costo_unitario de cadena a numero

                  this.materialService.agregarMaterial(this.material).subscribe(
                    (data: Respuesta) => {
                      if (data) {
                          this.mensaje = data.mensaje;
                          this.invocarMensaje(this.mensaje);
                      }
                    },
                    (error) => {
                      this.mensaje = error.mensaje;
                      this.invocarMensaje(this.mensaje);
                    }
                  );
                  break;
            
            
                case 'Direcciones':
            
            
                    this.direccion = forma.value;
                    this.direccionesService.agregarDireccion(this.direccion).subscribe(
                      (data: Respuesta) => {
                        this.mensaje = data.mensaje;
                        this.invocarMensaje(this.mensaje);
                      },
                      (error) => {
                        this.mensaje = "Error al agregar direccion";
                        this.invocarMensaje(this.mensaje);
                        
                      }
                    )
                  
                case 'Usuarios':
                    
                    this.usuario = forma.value;
                    this.usuariosService.agregarUsuario(this.usuario).subscribe(
                      (data: Respuesta) => {
                        this.mensaje = data.mensaje;
                        this.invocarMensaje(this.mensaje);
                      },
                      (error) => {
                        this.mensaje = "Error al agregar usuario";
                        this.invocarMensaje(this.mensaje);
                      }
                    )


                case 'Empleados':
                    this.empleado = forma.value;
                    this.empleadoService.agregarEmpleado(this.empleado)
                      .subscribe(
                        (data: Respuesta) => {
                          this.mensaje = data.mensaje;
                          this.invocarMensaje(this.mensaje);
                        },
                        (error) => {
                          this.mensaje = "Error al agregar empleado";
                          this.invocarMensaje(this.mensaje);
                        }
                      )
                    
                    
            }
        }
      })
        

   }

   armar():void{
     // Funcion que permite construir el formulario de acuerdo de los datos que se obtengan
    if(this.tipo.includes("Materiales")) {
      this.opciones.push('id');
      this.opciones.push("nombre");
      this.opciones.push("costo_unitario");
    }  else if (this.tipo.includes("Direcciones")){
      this.opciones.push('id');
      this.opciones.push("calle");
      this.opciones.push("ciudad");
      this.opciones.push("estado");
      this.opciones.push("cp");
    } else if (this.tipo.includes("Usuarios")){
      this.opciones.push('id');
      this.opciones.push('usuario');
      this.opciones.push('password');
      this.opciones.push('privilegios');
    } else if (this.tipo.includes("Empleados")){
      this.opciones.push('id');
      this.opciones.push('nombre');
      this.opciones.push('ap_paterno');
      this.opciones.push('ap_materno');
      this.opciones.push('direccion');
      this.direccionesService.getDirecciones().subscribe(
        (direcciones: Respuesta)=> {
          this.direcciones = direcciones.direcciones;
        }
      )
    }
   }
   
   invocarMensaje(mensaje):void{
     // Funcion que permite mandar un sweetalert con informacion e invoca a la funcion que limpia el formulario
    Swal.fire(
      mensaje
    )
    this.mensaje = null;
    this.borrarInfo();
   };

   borrarInfo():void {
    // Funcion que permite limpiar el formulario
    if (this.tipo === 'Usuarios' ) {
      // Depende del tipo que este manejando va a limpiar el objeto
      this.usuario =  {
        id:'',
        usuario:'',
        password:'',
        privilegios:''
      };
    } else if (this.tipo === 'Materiales') {
      this.material = {
          id:'',
          nombre:'',
          costo_unitario: 0
      }
    } else if (this.tipo === 'Direcciones') {
      this.direccion =  {
        id: '',
        calle:'',
        ciudad:'',
        estado:'',
        cp:''
      }
    } else if (this.tipo === 'Empleados') {
      this.empleado = {
        id: '',
        nombre:'',
        ap_paterno:'',
        ap_materno:'',
        direccion:''
      }
    }
   }

  ngOnInit() {
  }

}
