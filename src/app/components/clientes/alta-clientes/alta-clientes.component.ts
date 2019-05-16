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

  constructor(private clientesService:ClientesService) { }

  ngOnInit() {
  }

  alta(forma:NgForm){
    this.cliente.id = arreglarId(this.cliente.id);
    let camposVacios = comprobarDatosQueNoEstenVacios(this.cliente);
    if(camposVacios.length <=0) {
        this.clientesService.agregarCliente(this.cliente)
            .subscribe(
              (data) => this.limpiarDatos() ,
              (data:Respuesta) => {
                this.showMessage(data.error.mensaje);
              }
            )
    } else {
      this.showMessage('Campos vacios: '+camposVacios.join(', '));
    }
  }

  changeID():void{
    if (this.cliente.id.charAt(this.cliente.id.length-1).includes("0") && this.cliente.id.length <= 5) {
      return;
    }
    if(!Number(this.cliente.id.charAt(this.cliente.id.length-1)) || this.cliente.id.length > 5){
      this.cliente.id = this.cliente.id.slice(0,this.cliente.id.length-1);
    }
  }

  changeCP():void{
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
