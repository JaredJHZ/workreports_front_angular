import { Component, OnInit } from '@angular/core';
import { Usuario, Respuesta } from 'src/app/interfaces/interfaces';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {

  usuario:Usuario;
  terminoBuscado:string;
  listaDeUsuarios:Usuario[];
  mensaje:String;
  boton1:String = 'Anterior';
  boton2:String = 'Siguiente';

  constructor(private usuariosService:UsuariosService, private activatedRoute:ActivatedRoute, private router:Router) {
    this.activatedRoute.params.subscribe(
      params => {
        this.terminoBuscado = params['termino']
        this.usuariosService.getUsuario(params['id'])
            .subscribe(
              (data:Respuesta) => {
                this.usuario = data.usuario;
                this.usuario.privilegios = this.usuario.permission;
                 this.usuariosService.getUsuarios().subscribe(
                      (data:Respuesta) => {
                        let usuarios:Usuario[] = data.usuarios;
                        this.listaDeUsuarios = usuarios.filter(
                            (usuario) => usuario.id !== this.usuario.id && usuario.usuario.toUpperCase().includes(this.terminoBuscado.toUpperCase())
                        )

                        if (this.listaDeUsuarios.length <= 0) {
                          this.boton1 = 'Cancelar';
                          this.boton2 = 'Modificar';
                        }
                      }
                    )
              }
            )
      }
    )
 }

 modificar():void {
  this.usuariosService.modificarUsuario(this.usuario.id,this.usuario)
      .subscribe(
        (data) => this.router.navigate(['busqueda/usuarios/modificaciones']),
        (data:Respuesta) => this.showMessage(data.error.mensaje)
      )
}

  ngOnInit() {
  }

  siguiente():void {
    if(this.listaDeUsuarios.length > 1){
       this.router.navigate(['usuarios/modificaciones',this.terminoBuscado,this.listaDeUsuarios[1].id]);
    }
  }
 
  anterior():void{
   if(this.listaDeUsuarios.length > 0){
     this.router.navigate(['usuarios/modificaciones',this.terminoBuscado,this.listaDeUsuarios[0].id]);
   }
  }
 
  showMessage(mensaje:String):void{
   this.mensaje = mensaje;
   setTimeout(() => {
     this.mensaje = '';
   }, 3000);
 }

 boton1Handler():void {
   if (this.boton1.includes('Cancelar')) {
     this.router.navigate(['/']);
   }else {
     this.anterior();
   }
 }

 boton2Handler():void {
  if(this.boton2.includes('Modificar')) {
    this.modificar();
  }
 }

 seleccionar():void {
   this.listaDeUsuarios = [];
   this.boton1 = 'Cancelar';
   this.boton2 = 'Modificar';
 }
 

}
