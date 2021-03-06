import { Component, OnInit } from '@angular/core';
import { Material, Respuesta } from 'src/app/interfaces/interfaces';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-baja-materiales',
  templateUrl: './baja-materiales.component.html',
  styleUrls: ['./baja-materiales.component.css']
})
export class BajaMaterialesComponent implements OnInit {

  material:Material;
  listaDeMateriales:Material[];
  terminoBuscado:string;
  mensaje:String;
  boton1 = 'Anterior';
  boton2 = 'Siguiente';

  constructor(private materialesService:MaterialesService, 
    private activatedRoute:ActivatedRoute,
    private router:Router) {
      this.activatedRoute.params
          .subscribe(
            (params) => {
              this.terminoBuscado = params['termino'];
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
                            this.boton2 = 'Eliminar';
                          }
                        }
                      )
                    }
                  )
            }
          )
   }

   seleccionar():void {
    this.boton1 = "Cancelar";
    this.boton2 = "Eliminar";
    this.listaDeMateriales = [];
  }

   b1handler() {
     if (this.boton1.includes('Cancelar')) {
       this.router.navigate(['/']);
     } else {
       this.anterior();
     }
   }

   b2handler() {
     if (this.boton2.includes('Eliminar')) {
       this.borrar();
     } else {
       this.siguiente();
     }
   }

   borrar():void {
      this.materialesService.eliminarMaterial(this.material.id)
          .subscribe(
            (data) => this.router.navigate(['busqueda/materiales/bajas']),
            (data:Respuesta) => this.showMessage(data.error.mensaje)
          )
   }
   

   siguiente():void {
     if(this.listaDeMateriales.length > 1){
        this.router.navigate(['materiales/bajas',this.terminoBuscado,this.listaDeMateriales[1].id]);
     }
   }

   anterior():void{
    if(this.listaDeMateriales.length > 0){
      this.router.navigate(['materiales/bajas',this.terminoBuscado,this.listaDeMateriales[0].id]);
    }
   }

  ngOnInit() {
  }

  showMessage(mensaje:String):void{
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

}
