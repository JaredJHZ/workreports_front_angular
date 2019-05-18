import { Component, OnInit } from '@angular/core';
import { Usuario, Respuesta } from 'src/app/interfaces/interfaces';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-baja-usuarios',
  templateUrl: './baja-usuarios.component.html',
  styleUrls: ['./baja-usuarios.component.css']
})
export class BajaUsuariosComponent implements OnInit {

  usuario:Usuario;
  listaDeUsuarios:Usuario[];
  terminoBuscado:string;
  mensaje:String;
  boton1:String = 'Anterior';
  boton2:String = 'Siguiente';

  constructor(private usuariosService:UsuariosService, 
    private activatedRoute:ActivatedRoute,
    private router:Router) {
      this.activatedRoute.params
          .subscribe(
            (params) => {
              this.terminoBuscado = params['termino'];
              this.usuariosService.getUsuario(params['id'])
                  .subscribe(
                    (data:Respuesta) => {
                      this.usuario = data.usuario;
                      this.usuariosService.getUsuarios().subscribe(
                        (data:Respuesta) => {
                          let usuarios:Usuario[] = data.usuarios;
                          this.listaDeUsuarios = usuarios.filter(
                              (usuario) => usuario.id !== this.usuario.id && usuario.usuario.toUpperCase().includes(this.terminoBuscado.toUpperCase())
                          )
                          if (this.listaDeUsuarios.length <= 0) {
                            this.boton1 = 'Cancelar';
                            this.boton2 = 'Eliminar';
                          }
                        }
                      )
                    }
                  )
            }
          )
   }
  ngOnInit() {
  }

  borrar() {
    this.usuariosService.eliminarUsuario(this.usuario.id)
    .subscribe(
      (data) => this.router.navigate(['busqueda/usuarios/bajas']),
      (data:Respuesta) => this.showMessage(data.error.mensaje)
    )
  }

  seleccionar():void {
    this.boton1 = "Cancelar";
    this.boton2 = "Eliminar";
    this.listaDeUsuarios = [];
  }

  b1handler():void {
    if (this.boton1.includes("Cancelar")) {
      this.router.navigate(['/']);
    } else {
      this.anterior();
    }
  }

  b2handler():void {
    if(this.boton2.includes("Eliminar")) {
      this.borrar();
    } else {
      this.siguiente();
    }
  }
  
  siguiente():void {
    if(this.listaDeUsuarios.length > 1){
       this.router.navigate(['usuarios/bajas',this.terminoBuscado,this.listaDeUsuarios[1].id]);
    }
  }

  anterior():void{
   if(this.listaDeUsuarios.length > 0){
     this.router.navigate(['usuarios/bajas',this.terminoBuscado,this.listaDeUsuarios[0].id]);
   }
  }


 showMessage(mensaje:String):void{
   this.mensaje = mensaje;
   setTimeout(() => {
     this.mensaje = '';
   }, 3000);
 }

}
