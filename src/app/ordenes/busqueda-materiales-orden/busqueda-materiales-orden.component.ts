import { Component, OnInit } from '@angular/core';
import { Orden, Respuesta, Material, MaterialesParaOrden } from 'src/app/interfaces/interfaces';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-busqueda-materiales-orden',
  templateUrl: './busqueda-materiales-orden.component.html',
  styleUrls: ['./busqueda-materiales-orden.component.css']
})
export class BusquedaMaterialesOrdenComponent implements OnInit {

  mostrar:boolean = false;
  listaOrdenes:Orden[];
  ordenes:Orden[];
  terminoBuscado:string;
  mensaje:String;
  id_material:String;
  nombre_material:String
  claveMateriales:String[];
  tipo:String;
  orden:Orden;
  cantidad_estimada: number;
  cantidad_real:number;

  constructor(private ordenesService:OrdenesService, private materialesService:MaterialesService, private activatedRoute: ActivatedRoute, private router:Router) { 
      this.ordenesService.getAllOrdenes()
          .subscribe(
            (data:Respuesta) => {
              this.ordenes = data.ordenes;
            }
          )

      this.materialesService.getTodosMateriales()
            .subscribe(
              (data:Respuesta) => {
                this.claveMateriales = data.materiales.map((material:Material) => material.id)
              }
            )

      this.activatedRoute.params.subscribe(
        (data:Respuesta) => {
          this.tipo = data['tipo'];
        }
      )
  }

  encontrarID():void {
    if(this.id_material.length >= 5) {
      if(!this.claveMateriales.includes(this.id_material)) {
        this.id_material = '';
        this.showMessage('No existe el material!');
        return;
      } else {
        let seEncuentra = false;
        for(let i = 0; i < this.orden.materiales.length ; i ++)  {
          if(this.orden.materiales[i]['id'] === this.id_material) {
            seEncuentra = true;
          }
        }

        if(!seEncuentra) {
          this.showMessage('La tarea no se encuentra en la orden de trabajo');
          this.id_material = '';
        } else {
          this.materialesService.getMaterial(this.id_material)
              .subscribe((data:Respuesta) => this.nombre_material = data.material.nombre)
        }
      }
    }
    if(this.id_material.charAt(this.id_material.length-1).includes("0") && this.id_material.length <= 5) {
      return
    }
    if(!Number(this.id_material.charAt(this.id_material.length-1)) || this.id_material.length > 5){
      this.id_material= this.id_material.slice(0,this.id_material.length-1);
    }
  }

  cambiarBusqueda():void{
    this.listaOrdenes = this.ordenes.filter(
      (orden) => orden.id.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )

  }

  limpiar():void {
    this.mostrar = false;
    this.terminoBuscado = '';
  }

  ngOnInit() {
  }

  busqueda():void {
    if ( this.listaOrdenes === undefined || this.listaOrdenes.length <= 0) {
      this.showMessage("No existen ordenes con ese termino de busqueda");
    } else {
      this.mostrar = true;
      this.ordenesService.getOrden(this.terminoBuscado)
          .subscribe(
            (data:Respuesta) => this.orden = data.orden 
          )
    }
  }

 

  cambiarIDMaterial():void {
    if(this.id_material.length >= 5) {
      if(!this.claveMateriales.includes(this.id_material)) {
        this.id_material = '';
        this.showMessage('No existe el material!');


        return;
      } else {

        let materialEncontrado = false;


        for(let i = 0; i < this.orden.materiales.length ; i++) {
          if (this.orden.materiales[i]['id'] === this.id_material) {
            materialEncontrado = true;
          }
        }

        if (materialEncontrado) {
          this.showMessage('El material ya se encuentra en la orden');
          return;
        }

        this.materialesService.getMaterial(this.id_material)
            .subscribe(
              (data:Respuesta) => this.nombre_material = data.material.nombre
            )
      }
    }
    if(this.id_material.charAt(this.id_material.length-1).includes("0") && this.id_material.length <= 5) {
      return
    }
    if(!Number(this.id_material.charAt(this.id_material.length-1)) || this.id_material.length > 5){
      this.id_material= this.id_material.slice(0,this.id_material.length-1);
    }
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  agregar():void {
      let materialOrden:MaterialesParaOrden = {
        id: this.id_material,
        cantidad_estimada: this.cantidad_estimada,
        cantidad_utilizada: this.cantidad_real
      }

      console.log(this.id_material);

      this.ordenesService.agregarMaterial(this.terminoBuscado, this.id_material, materialOrden)
          .subscribe(
            (data) => this.router.navigate(['/'])
          )
  }

  eliminar():void {
    this.ordenesService.eliminarMaterial(this.terminoBuscado, this.id_material)
        .subscribe(
          (data:Respuesta) => console.log(data)
        )
  }


}
