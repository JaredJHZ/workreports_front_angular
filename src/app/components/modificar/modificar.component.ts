import { Component, OnInit } from '@angular/core';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Respuesta, Usuario, Material, Direccion, Empleado, Cliente } from 'src/app/interfaces/interfaces';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  img:string;
  tipo:string;
  id:string;
  opciones:string[] = [];
  mensaje: string;
  direcciones: Direccion[] = [];


  material: Material = {
    nombre:'',
    costo_unitario:0
  };

  usuario: Usuario = {
    permission: '',
    usuario: '',
    password:''
  }

  direccion: Direccion = {
    calle: '',
    ciudad:'',
    cp:'',
    estado:''
  }

  empleado: Empleado = {
    nombre:'',
    ap_paterno:'',
    ap_materno:'',
    direccion:''
  }

  cliente: Cliente = {
    nombre:'',
    ap_paterno:'',
    ap_materno:'',
    direccion:'',
    email:''
  }


  constructor(private materialS:MaterialesService, private activatedRoute:ActivatedRoute, private usuarioService:UsuariosService
    , private direccionesService: DireccionesService, private empleadosService: EmpleadosService, private clienteService: ClientesService
    ) { 
      this.activatedRoute.params.subscribe(
        (data) => {
            this.tipo = data["tipo"];
            this.id = data["id"];
            this.imagenes(this.tipo);
            
            if(this.tipo === "material") {
              this.opciones.push("nombre");
              this.opciones.push("costo_unitario");
              this.materialS.getMaterial(this.id).subscribe(
                (material:Respuesta) => {
                  this.material["nombre"] = material.cliente["nombre"];
                  this.material["costo_unitario"] = material.cliente["costo_unitario"];
                }
              )
            }

            if(this.tipo === 'usuarios') {
              
              this.opciones.push("usuario");
              this.opciones.push("privilegios");
              this.opciones.push("password");
              
              this.usuarioService.getUsuario(this.id).subscribe(
                (usuario: Usuario) => {
                  this.usuario.privilegios = usuario.permission;
                  this.usuario.usuario = usuario.usuario;
                }
              )

            }

            if (this.tipo === 'direccion'){
              this.opciones.push("calle");
              this.opciones.push("ciudad");
              this.opciones.push("estado");
              this.opciones.push("cp");

              this.direccionesService.getDireccion(this.id).subscribe(
                (data: Respuesta) => {
                  let direccion: Direccion = data.direccion;
                  this.direccion.calle = direccion.calle;
                  this.direccion.ciudad = direccion.ciudad;
                  this.direccion.estado = direccion.estado;
                  this.direccion.cp = direccion.cp; 
                }
              )

              
            }

            if (this.tipo === 'empleados') {
                this.opciones.push("nombre");
                this.opciones.push("ap_paterno");
                this.opciones.push("ap_materno");
                this.opciones.push("direccion");
                this.empleadosService.getEmpleado(this.id)
                  .subscribe(
                    (data: Respuesta) => {
                      let empleado = data.empleado;
                      this.empleado.ap_paterno = empleado.ap_paterno;
                      this.empleado.ap_materno = empleado.ap_materno;
                      this.empleado.direccion = empleado.id_direccion;
                      this.empleado.nombre = empleado.nombre;
                      this.direccionesService.getDirecciones()
                        .subscribe(
                          (data: Respuesta) => {
                            this.direcciones = data.direcciones;
                          }
                        )
                    }
                  )
            }

            
            if (this.tipo === 'clientes') {
                this.opciones.push("nombre");
                this.opciones.push("ap_paterno");
                this.opciones.push("ap_materno");
                this.opciones.push("direccion");
                this.opciones.push("email");
                this.clienteService.getCliente(this.id)
                  .subscribe(
                    (data: Respuesta) => {
                      let cliente = data.cliente;
                      this.cliente = cliente;
                      this.cliente.direccion = cliente.id_direccion;
                      this.direccionesService.getDirecciones()
                        .subscribe(
                          (data: Respuesta) => {
                            this.direcciones = data.direcciones;
                          }
                        )
                    }
                  )

            }

            
        }
      )
  }

  ngOnInit() {
  }

  guardar(forma:NgForm){

          Swal.fire({
            title: '¿Está seguro?',
            text: "¿Desea realizar la modificacion?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "aceptar"
          }).then((result) => {
            if (result) {

              
              if (this.tipo === 'materiales') {
                this.materialS.modifyMaterial(this.id, this.material).subscribe(
                  (data: Respuesta) => {
                      this.invocarMensaje(data.mensaje);
                  },
                  (error: Respuesta) => {
                    this.invocarMensaje(error.mensaje);
                  }
                )
              }

              if (this.tipo === 'usuarios') {
                this.usuarioService.modificarUsuario(this.id, this.usuario).subscribe(
                (data: Respuesta) => {
                    this.invocarMensaje(data.mensaje);
                  },
                  (error: Respuesta) => {
                    this.invocarMensaje(error.mensaje);
                  }
                )
              }

              if (this.tipo === 'direccion'){
                this.direccionesService.modificarDireccion(this.id, this.direccion).subscribe(
                  (data: Respuesta) => {
                    this.invocarMensaje(data.mensaje);
                  },
                  (error: Respuesta) => {
                    this.invocarMensaje(error.mensaje);
                  }
                )
              }
              
              if (this.tipo === 'empleados') {
                this.empleadosService.modificarEmpleado(this.id, this.empleado)
                  .subscribe(
                    (data: Respuesta) => {
                      this.invocarMensaje(data.mensaje);
                    },
                    (error: Respuesta) => {
                      this.invocarMensaje(error.mensaje);
                    }
                  )
              }
             
              if (this.tipo === 'clientes'){
                this.clienteService.modificarCliente(this.id, this.cliente)
                  .subscribe(
                    (data: Respuesta) => {
                      this.invocarMensaje(data.mensaje);
                    },
                    (error: Respuesta) => {
                      this.invocarMensaje(error.mensaje);
                    }
                  )
              }

            }
          })
        }

    



  invocarMensaje(mensaje):void{
    // Funcion que permite mandar un sweetalert con informacion e invoca a la funcion que limpia el formulario
   Swal.fire(
     mensaje
   )
   this.mensaje = null;
  };

  imagenes(tipo){
    // Cargar imagenes
    if (tipo === 'material'){
      this.img = '/assets/cons.jpg';
    } else if (tipo === 'usuarios'){
      this.img = '/assets/usuarios.png';
    } else if (tipo === 'direccion'){
      this.img = '/assets/direcciones.jpeg';
    } else if (tipo === 'empleados'){
      this.img = '/assets/empleados.jpg';
    } else if (tipo === 'clientes') {
      this.img = '/assets/clientes.jpeg';
    }
  }


}
