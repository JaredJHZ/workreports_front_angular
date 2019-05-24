import { Component, OnInit } from '@angular/core';
import { Cliente, Respuesta } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { arreglarId, comprobarDatosQueNoEstenVacios } from 'src/app/funciones';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-alta-clientes',
  templateUrl: './alta-clientes.component.html',
  styleUrls: ['./alta-clientes.component.css']
})
export class AltaClientesComponent implements OnInit {

  clavesDeClientes:String[];

  cliente:Cliente = {
    id:'',
    nombre:'',
    ap_paterno:'',
    ap_materno:'',
    calle:'',
    ciudad:'',
    estado:'',
    cp:'',
    email:''
  }

  mensaje:String;

  mensajeClave:boolean;

  constructor(private clientesService:ClientesService) {
      this.clientesService.getClientes()
          .subscribe(
            (data:Respuesta) => this.clavesDeClientes = data.clientes
                                                            .map(
                                                              (cliente:Cliente) => cliente.id
                                                            )
          )
   }

  ngOnInit() {
  }

  alta(forma:NgForm, el){
    this.cliente.id = arreglarId(this.cliente.id);
    let camposVacios = comprobarDatosQueNoEstenVacios(this.cliente);
    if(camposVacios.length <=0) {
        this.clientesService.agregarCliente(this.cliente)
            .subscribe(
              (data) => {
                this.limpiarDatos();
                el.focus();
              } ,
              (data:Respuesta) => {
                this.showMessage(data.error.mensaje);
              }
            )
    } else {
      this.showMessage('Campos vacios: '+camposVacios.join(', '));
    }
  }

  changeID(el):void{
    if (this.cliente.id.length >= 5) {
      if(this.clavesDeClientes.includes(this.cliente.id)) {
        this.cliente.id = '';
        this.mensajeClave = true;
        return;
      } else {
        this.mensajeClave = false;
        el.focus();
      }
    }
    if (this.cliente.id.charAt(this.cliente.id.length-1).includes("0") && this.cliente.id.length <= 5) {
      return;
    }
    if(!Number(this.cliente.id.charAt(this.cliente.id.length-1)) || this.cliente.id.length > 5){
      this.cliente.id = this.cliente.id.slice(0,this.cliente.id.length-1);
    }
  }

  changeCP(el):void{
    if (this.cliente.cp.length >= 5) {
      el.focus();
    }
    if(!Number(this.cliente.cp.charAt(this.cliente.id.length-1)) || this.cliente.cp.length >5){
      this.cliente.cp = this.cliente.cp.slice(0,this.cliente.id.length-1);
    }
  }

  showMessage(mensaje:string):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  limpiarDatos():void{
    this.cliente = {
      id:'',
      nombre:'',
      ap_paterno:'',
      ap_materno:'',
      calle:'',
      ciudad:'',
      estado:'',
      cp:''
    }
  }



}
