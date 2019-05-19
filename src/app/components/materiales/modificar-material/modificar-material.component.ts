import { Component, OnInit } from '@angular/core';
import { Material, Respuesta } from 'src/app/interfaces/interfaces';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-material',
  templateUrl: './modificar-material.component.html',
  styleUrls: ['./modificar-material.component.css']
})
export class ModificarMaterialComponent implements OnInit {

  material:Material;
  terminoBuscado:string;
  listaDeMateriales:Material[];
  mensaje:String;
  boton1:String = 'Anterior';
  boton2:String = 'Siguiente';

  constructor(private materialesService:MaterialesService, private activatedRoute:ActivatedRoute, private router:Router) {
      this.activatedRoute.params.subscribe(
        params => {
          this.terminoBuscado = params['termino']
          this.materialesService.getMaterial(params['id'])
              .subscribe(
                (data:Respuesta) => {
                  this.material = data.material;
                                        this.materialesService.getTodosMateriales().subscribe(
                        (data:Respuesta) => {
                          let materiales:Material[] = data.materiales;
                          this.listaDeMateriales = materiales.filter(
                              (material) => material.id !== this.material.id && material.nombre.toUpperCase().includes(this.terminoBuscado.toUpperCase())
                          )
                          if (this.listaDeMateriales.length <= 0) {
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
    this.materialesService.modifyMaterial(this.material.id,this.material)
        .subscribe(
          (data) => this.router.navigate(['busqueda/materiales/modificaciones']),
          (data:Respuesta) => this.showMessage(data.error.mensaje)
        )
 }
 

 siguiente():void {
   if(this.listaDeMateriales.length > 1){
      this.router.navigate(['materiales/modificaciones',this.terminoBuscado,this.listaDeMateriales[1].id]);
   }
 }

 anterior():void{
  if(this.listaDeMateriales.length > 0){
    this.router.navigate(['materiales/modificaciones',this.terminoBuscado,this.listaDeMateriales[0].id]);
  }
 }

 seleccionar():void {
  this.boton1 = "Cancelar";
  this.boton2 = "Modificar";
  this.listaDeMateriales = [];
}

 boton1Handler() {
   if (this.boton1.includes('Cancelar')) {
     this.router.navigate(['/']);
   } else {
     this.anterior();
   }
 }

 boton2Handler() {
   if (this.boton2.includes('Modificar')) {
     this.modificar();
   } else {
     this.siguiente();
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
