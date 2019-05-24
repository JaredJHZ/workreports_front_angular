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
  mensaje:String;
  
  constructor(private usuariosService:UsuariosService) { 
    this.usuariosService.getUsuarios()
        .subscribe(
          (data:Respuesta) => this.usuarios = data.usuarios
        )
  }

  limpiar():void {
    this.mostrarResultados = false;
    this.terminoBuscado = '';
    this.usuariosBuscados = [];
  }

  ngOnInit() {
  }
  buscar():void {
    if (this.usuariosBuscados.length <= 0) {
      this.showMessage('Ningun usuario existe con ese criterio');
    } else {
      this.mostrarResultados = true;
    }
  }

  refrescarBusqueda():void {
    this.usuariosBuscados = this.usuarios.filter(
        (usuario) => usuario.usuario.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )
  }


  showMessage(mensaje:String):void {
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

}
