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

  clavesUsadas:String[] = [];

  usuario:Usuario= {
    id:'',
    usuario:'',
    password:'',
    privilegios:'USER'
  };

  mensaje:String;

  textoClave:boolean = false;

  constructor(private router:Router, private usuariosService:UsuariosService) {
      this.usuariosService.getUsuarios()
          .subscribe(
            (data:Respuesta) => {
              this.clavesUsadas = data.usuarios.map(
                (usuario) => usuario.id
              )
            } 
          )
   }

  ngOnInit() {
  }


  alta(forma:NgForm, el){
    let camposVacios = comprobarDatosQueNoEstenVacios(this.usuario);
    this.usuario.id = arreglarId(this.usuario.id);
    if(camposVacios.length <= 0) {
      this.usuariosService.agregarUsuario(this.usuario)
          .subscribe(
            (data:Respuesta) => {
              this.limpiarDatos();
              el.focus();
            },
            (data:Respuesta) => {
              this.showMessage(data.error.mensaje);
              this.usuario.id = '';
            }
          )
    } else{
      this.showMessage('Campos vacios: '+camposVacios.join(', '));
    }
  }

  changeID(e, el):void{
    if (this.usuario.id.length >=5) {
      if (this.clavesUsadas.includes(this.usuario.id)) {
        this.textoClave = true;
        this.usuario.id = '';
      } else {
        el.focus();
        this.textoClave = false;
      }
    }
    if (this.usuario.id.charAt(this.usuario.id.length-1).includes("0") && this.usuario.id.length <= 5){
      return;
    }
    if(!Number(this.usuario.id.charAt(this.usuario.id.length-1)) || this.usuario.id.length > 5){
      this.usuario.id = this.usuario.id.slice(0,this.usuario.id.length-1);
    }
  }

  changePassFocus(e,el):void {
    console.log(e.keyCode);
    if (this.usuario.usuario.length >= 50) {
      el.focus();
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
