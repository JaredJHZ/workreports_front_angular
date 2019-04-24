import { Component, OnInit } from '@angular/core';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta, Direccion, Material, Usuario } from 'src/app/interfaces/interfaces';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-consultar',
  templateUrl: 'consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  img:string;
  id:String;
  tipo:String;
  
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
    privilegios:''
  }
  
  aux = {}
  opciones:String[] = [];

  constructor(private materialService:MaterialesService, private activatedRoute:ActivatedRoute,
    private direccionesService: DireccionesService, private usuariosService: UsuariosService) { 
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
      this.opciones.push("privilegios")
      this.usuariosService.getUsuario(this.id).subscribe(
        (usuario:Usuario) => {
          this.usuario.id = usuario.id;
          this.usuario.usuario = usuario.usuario;
          this.usuario.privilegios = usuario.permission;
          this.aux = this.usuario;
        }
      )
    }


  }

  imagenes(tipo){
    if (tipo === 'material'){
      this.img = '/assets/cons.jpg';
    } else if (tipo === 'usuarios'){
      this.img = '/assets/usuarios.png';
    } else if (tipo === 'direccion'){
      this.img = '/assets/direcciones.jpeg'
    }
  }


}
