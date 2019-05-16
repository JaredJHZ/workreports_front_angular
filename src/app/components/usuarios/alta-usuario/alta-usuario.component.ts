import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario, Respuesta } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { comprobarDatosQueNoEstenVacios, arreglarId } from 'src/app/funciones';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  usuario:Usuario= {
    id:'',
    usuario:'',
    password:'',
    privilegios:'USER'
  };

  mensaje:String;

  constructor(private router:Router, private usuariosService:UsuariosService) {

   }

  ngOnInit() {
  }


  alta(forma:NgForm){
    let camposVacios = comprobarDatosQueNoEstenVacios(this.usuario);
    this.usuario.id = arreglarId(this.usuario.id);
    if(camposVacios.length <= 0) {
      this.usuariosService.agregarUsuario(this.usuario)
          .subscribe(
            (data:Respuesta) => this.limpiarDatos(),
            (data:Respuesta) => {
              this.showMessage(data.error.mensaje);
              this.usuario.id = '';
            }
          )
    } else{
      this.showMessage('Campos vacios: '+camposVacios.join(', '));
    }
  }

  changeID():void{
    if (this.usuario.id.charAt(this.usuario.id.length-1).includes("0") && this.usuario.id.length <= 5){
      return;
    }
    if(!Number(this.usuario.id.charAt(this.usuario.id.length-1)) || this.usuario.id.length > 5){
      this.usuario.id = this.usuario.id.slice(0,this.usuario.id.length-1);
    }
  }

  limpiarDatos():void{
    this.usuario = {
      id:'',
      usuario:'',
      password:'',
      privilegios:'USER'
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }


}
