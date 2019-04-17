import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  tipo: String; 
  opciones:String[] = [];
  material: {
    id:'',
    nombre:'',
    costo_unitario:0
  }



  constructor(private activatedRoute: ActivatedRoute, private materialService:MaterialesService) {
    this.activatedRoute.params.subscribe(
      (data) => {
        this.tipo = data.tipo;
      }
    )
    if(this.tipo.includes("Materiales")) {
      this.opciones.push('id');
      this.opciones.push("nombre");
      this.opciones.push("costo_unitario");
    }
   }

   agregar(forma: NgForm) {
     switch (this.tipo){
        case 'Materiales':
          this.material = forma.value;
          this.material.costo_unitario = Number(this.material.costo_unitario);
          this.materialService.agregarMaterial(this.material).subscribe(
            (data) => console.log(data)
          )
     }

   }

  ngOnInit() {
  }

}
