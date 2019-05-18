import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { Respuesta, Cliente } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-busqueda-clientes',
  templateUrl: './busqueda-clientes.component.html',
  styleUrls: ['./busqueda-clientes.component.css']
})
export class BusquedaClientesComponent implements OnInit {

  nombreCliente:String ='';
  apellidoPCliente:String='';
  apellidoMCliente:String='';
  listaClientes:Cliente[];
  clientes:Cliente[];
  mensaje:String;
  tipo:string;

  constructor(private router:Router, private clientesService:ClientesService, private activatedRoute:ActivatedRoute) { 

    this.activatedRoute.params.subscribe(
      params => {
        this.tipo = params['tipo']
      }
    )
    this.clientesService.getClientes()
        .subscribe(
          (data:Respuesta) => this.listaClientes = data.clientes
        )
  }

  cambiarBusqueda():void{
    this.clientes = this.listaClientes.filter(
      (cliente) => {

          if (this.nombreCliente.toUpperCase() === cliente.nombre.toUpperCase() ) {
            if (this.apellidoPCliente.toUpperCase()  === cliente.ap_paterno.toUpperCase() ){
              if (this.apellidoMCliente.toUpperCase()  === cliente.ap_materno.toUpperCase() ) {
                return true;
              }
            }
          }

          return false;
      }
    )

  }

  busqueda(el):void {
  
    if (this.clientes === undefined || this.clientes.length <= 0) {
      this.showMessage("No existen clientes con ese termino de busqueda");
      this.nombreCliente = '';
      this.apellidoMCliente = '';
      this.apellidoPCliente = '';
      el.focus();
    } else {
      this.router.navigate(['clientes',this.tipo,this.apellidoPCliente,this.apellidoMCliente, this.nombreCliente, this.clientes[0].id]);
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  ngOnInit() {
  }

}
