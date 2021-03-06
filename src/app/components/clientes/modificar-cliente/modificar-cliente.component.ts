import { Component, OnInit } from '@angular/core';
import { Cliente, Respuesta } from 'src/app/interfaces/interfaces';
import { ClientesService } from 'src/app/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { comprobarDatosQueNoEstenVacios } from 'src/app/funciones';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.css']
})
export class ModificarClienteComponent implements OnInit {

  cliente:Cliente;
  mensaje:String;
  nombre:String;
  apPaterno:String;
  apMaterno:String;
  listaDeClientes:Cliente[];
  boton1:String = 'Anterior';
  boton2:String = 'Siguiente';

  constructor(private clienteService:ClientesService, 
    private activatedRoute:ActivatedRoute,
    private router:Router) { 
      this.activatedRoute.params.subscribe(
        (params) => {
          this.nombre = params['nombre']
          this.apPaterno = params['apellidop']
          this.apMaterno = params['apellidom']
          this.clienteService.getCliente(params['id'])
              .subscribe(
                (data:Respuesta) => {
                  this.cliente = data.cliente
                  this.clienteService.getClientes()
                      .subscribe(
                        (data:Respuesta) =>  this.listaDeClientes = data.clientes.filter(
                          (cliente: Cliente) => {
                            if (this.nombre.toUpperCase() === cliente.nombre.toUpperCase() ) {
                              if (this.apPaterno.toUpperCase()  === cliente.ap_paterno.toUpperCase() ){
                                if (this.apMaterno.toUpperCase()  === cliente.ap_materno.toUpperCase() ) {
                                  return true;
                                }
                              }
                            }
                            return false;
                          }  
                      )
                  )
                }
              )
        }
      )
  }

  modificar():void{
    let camposVacios = comprobarDatosQueNoEstenVacios(this.cliente);
    if(camposVacios.length<=0) {
      this.clienteService.modificarCliente(this.cliente.id, this.cliente)
          .subscribe(
            (data) => this.router.navigate(['busqueda/clientes/modificaciones']),
            (data:Respuesta) => this.showMessage(data.error.mensaje)
          )
    } else {
      this.showMessage('Campos vacios: '+ camposVacios.join(' ,'));
    }
  }

  siguiente():void {
    if(this.listaDeClientes.length > 1){
     this.router.navigate(['clientes/modificaciones',this.apPaterno,this.apMaterno, this.nombre, this.listaDeClientes[1].id]);
    }
  }
 
  anterior():void{
   if(this.listaDeClientes.length > 0){
     this.router.navigate(['clientes/modificaciones',this.apPaterno,this.apMaterno, this.nombre, this.listaDeClientes[0].id]);
   }
  }
 
  showMessage(mensaje:String):void{
   this.mensaje = mensaje;
   setTimeout(() => {
     this.mensaje = '';
   }, 3000);
 }


 b1Handler():void {
  if(this.boton1.includes('Cancelar')) {
    this.router.navigate(['/']);
  } else {
    this.anterior();
  }
}

b2Handler():void {
  if(this.boton2.includes('Modificar')) {
    this.modificar();
  } else {
    this.siguiente();
  }
}

seleccionar():void {
  this.boton1 = "Cancelar";
  this.boton2 = "Modificar";
  this.listaDeClientes = [];
}
 

  ngOnInit() {
  }


  omit_special_char(event)
  {   
     let k;  
     k = event.charCode;
     if (Number(event.key)) {
       return false;
     }
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

  noNegatives(event)
  {   
     let k;  
     k = event.charCode;
     console.log((Number(event.key)));
     if (Number(event.key) < 0) {
       return false;
     }
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

}
