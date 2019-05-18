import { Component, OnInit } from '@angular/core';
import { Usuario, Respuesta } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-busqueda-usuarios',
  templateUrl: './busqueda-usuarios.component.html',
  styleUrls: ['./busqueda-usuarios.component.css']
})
export class BusquedaUsuariosComponent implements OnInit {

  tipo:String;
  terminoBuscado:string;
  listaDeUsuarios:Usuario[];
  usuarios:Usuario[];
  mensaje:String;

  constructor(private activatedRoute:ActivatedRoute, private usuariosService:UsuariosService, private router:Router) { 
    this.activatedRoute.params.subscribe(
      params => {
        this.tipo = params['tipo'];
        this.usuariosService.getUsuarios()
            .subscribe(
              (data:Respuesta) => {
                this.listaDeUsuarios = data.usuarios;
              }
            )
      }
    )
  }

  ngOnInit() {
  }

  cambiarBusqueda():void{
    this.usuarios = this.listaDeUsuarios.filter(
      (usuario) => usuario.usuario.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )

  }

  busqueda():void {
    if ( this.usuarios === undefined || this.usuarios.length <= 0) {
      this.showMessage("No existen usuarios con ese termino de busqueda");
    } else {
      this.router.navigate(['usuarios',this.tipo,this.terminoBuscado,this.usuarios[0].id]);
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

}
