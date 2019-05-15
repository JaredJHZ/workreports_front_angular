import { Component, OnInit } from '@angular/core';
import { Usuario, Respuesta } from 'src/app/interfaces/interfaces';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-consulta-usuarios',
  templateUrl: './consulta-usuarios.component.html',
  styleUrls: ['./consulta-usuarios.component.css']
})
export class ConsultaUsuariosComponent implements OnInit {
  usuarios:Usuario[];
  mostrarResultados:boolean = false;
  usuariosBuscados:Usuario[];
  terminoBuscado:string;
  
  constructor(private usuariosService:UsuariosService) { 
    this.usuariosService.getUsuarios()
        .subscribe(
          (data:Respuesta) => this.usuarios = data.usuarios
        )
  }

  ngOnInit() {
  }
  buscar():void {
    this.mostrarResultados = true;
  }

  refrescarBusqueda():void {
    this.usuariosBuscados = this.usuarios.filter(
        (usuario) => usuario.usuario.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )
  }

}
