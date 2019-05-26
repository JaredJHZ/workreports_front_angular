import { Component, OnInit } from '@angular/core';
import { Cliente, Respuesta } from 'src/app/interfaces/interfaces';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css']
})
export class ConsultaClientesComponent implements OnInit {

  clientes:Cliente[];
  mostrarResultados:boolean = false;
  clientesBuscados:Cliente[];
  nombreBuscado:string = '';
  apellidopBuscado:string = '';
  apellidomBuscado:string = '';

  constructor(private clientesService:ClientesService) { 
    this.clientesService.getClientes()
          .subscribe(
            (data:Respuesta) => this.clientes = data.clientes
          )
  }

  limpiar():void {
    this.mostrarResultados = false;
    this.nombreBuscado = '';
    this.apellidomBuscado = '';
    this.apellidopBuscado = '';
    
  }

  ngOnInit() {
  }

  buscar():void {
    this.mostrarResultados = true;
  }

  refrescarBusqueda():void {
    this.clientesBuscados = this.clientes.filter(
        (cliente) => {
          if(cliente.nombre.toUpperCase().includes(this.nombreBuscado.toUpperCase())) {
            if(cliente.ap_paterno.toUpperCase().includes(this.apellidopBuscado.toUpperCase())) {
              if(cliente.ap_materno.toUpperCase().includes(this.apellidomBuscado.toUpperCase())) {
                return true;
              }
            }
          }
          return false;
        }
    )
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

}
