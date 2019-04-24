import { Component, OnInit } from '@angular/core';
import { Material, Direccion, Respuesta, Usuario } from 'src/app/interfaces/interfaces';
import { MaterialesService } from 'src/app/services/materiales.service';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2";
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  img:string;
  id:String;
  tipo:String;
  mensaje:String;
  
  material: Material = {
    id:'',
    nombre:'',
    costo_unitario:0
  };
  direccion: Direccion = {
    id:'',
    calle:'',
    ciudad:'',
    estado:'',
    cp:''
  }
  usuario: Usuario = {
    id:'',
    usuario:'',
    privilegios:''
  }
  
  aux = {}
  opciones:String[] = [];

  constructor(private materialService:MaterialesService, private direccionesService: DireccionesService,
    private activatedRoute: ActivatedRoute, private router: Router, private usuariosService: UsuariosService) { 
    this.activatedRoute.params.subscribe(
      (data) => {
          this.id = data['id'];
          this.tipo = data['tipo'];
          this.cargar();
          this.imagenes(this.tipo);
      }
    )
  }

  ngOnInit() {
  }

  cargar(){
    // Carga los elementos de acuerdo al tipo
    if (this.tipo === 'material'){
      this.opciones.push("id");
      this.opciones.push("nombre");
      this.opciones.push("costo_unitario");

        this.materialService.getMaterial(this.id).subscribe(
          (material:Respuesta) => {
            this.material["id"] = material.cliente["id"];
            this.material["nombre"] = material.cliente["nombre"]
            this.material["costo_unitario"] = material.cliente["costo_unitario"]
            this.aux = this.material;
          }
        )
    } else if (this.tipo === 'direccion'){
      this.opciones.push("id");
      this.opciones.push("calle");
      this.opciones.push("ciudad");
      this.opciones.push("estado");
      this.opciones.push("cp");

      this.direccionesService.getDireccion(this.id).subscribe(
        (data: Respuesta) => {
          let direccion: Direccion = data.direccion;
          this.direccion.id = direccion.id;
          this.direccion.calle = direccion.calle;
          this.direccion.ciudad = direccion.ciudad;
          this.direccion.estado = direccion.estado;
          this.direccion.cp = direccion.cp;
          this.aux = this.direccion;
        }
      )
    } else if (this.tipo === 'usuarios') {
      this.opciones.push("id");
      this.opciones.push("usuario");
      this.opciones.push("privilegios");

      this.usuariosService.getUsuario(this.id).subscribe(
        (usuario: Usuario) => {
          this.usuario.id = usuario.id;
          this.usuario.usuario = usuario.usuario;
          this.usuario.privilegios = usuario.permission;
          this.aux = this.usuario;
        }
      )
      
    }
  }

  imagenes(tipo):void{

    // Carga de imagenes
    if (tipo === 'material'){
      this.img = '/assets/cons.jpg';
    } else if (tipo === 'usuarios'){
      this.img = '/assets/usuarios.png';
    } else if (tipo === 'direccion'){
      this.img = '/assets/direcciones.jpeg'
    }
  }

  eliminar():void {
    //funcion para eliminar en base de datos
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
        if (ok) {
          if (this.tipo === 'material') {
            this.materialService.eliminarMaterial(this.material.id).subscribe(
              (mensaje: Respuesta) => {
                  this.invocarMensaje(mensaje.mensaje);
                  this.regresar();
              }
            )
          }

          if (this.tipo === 'usuarios') {
            this.usuariosService.eliminarUsuario(this.id).subscribe(
              (mensaje: Respuesta) => {
                this.invocarMensaje(mensaje.mensaje);
                this.regresar();
              }
            )
          }

          if (this.tipo === 'direccion') {
            this.direccionesService.eliminarDireccion(this.id).subscribe(
              (mensaje: Respuesta) => {
                this.invocarMensaje(mensaje.mensaje);
                this.regresar();
              }
            )
          }

          
        }
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

  regresar(): void{
    // Funcion que permite regresar a la pagina de menu
    this.router.navigate(['/menu']);
  }




}