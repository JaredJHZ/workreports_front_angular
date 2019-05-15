import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Material, Respuesta } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-consulta-materiales',
  templateUrl: './consulta-materiales.component.html',
  styleUrls: ['./consulta-materiales.component.css']
})
export class ConsultaMaterialesComponent implements OnInit {

  materiales:Material[];
  mostrarResultados:boolean = false;
  materialesBuscados:Material[];
  terminoBuscado:string;
  
  constructor(private router:Router, private materialesService:MaterialesService) { 
      this.materialesService.getTodosMateriales()
          .subscribe(
            (data:Respuesta) => this.materiales = data.materiales
          )
  }

  buscar():void {
    this.mostrarResultados = true;
  }

  refrescarBusqueda():void {
    this.materialesBuscados = this.materiales.filter(
        (material) => material.nombre.toUpperCase().includes(this.terminoBuscado.toUpperCase())
    )
  }

  ngOnInit() {
  }

}
