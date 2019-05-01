import { Component, OnInit } from '@angular/core';
import { Orden, Respuesta } from 'src/app/interfaces/interfaces';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seleccionar-orden',
  templateUrl: './seleccionar-orden.component.html',
  styleUrls: ['./seleccionar-orden.component.css']
})
export class SeleccionarOrdenComponent implements OnInit {

  ordenes: Orden[] = [];
  ordenesActuales: Orden[];
  paginaActual = 1;
  paginasTotales = 0;
  tipo: String;

  constructor(private ordenesService: OrdenesService, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params
    .subscribe(
      (data) => this.tipo = data['tipo']
    )

    this.ordenesService.getAllOrdenes()
    .subscribe(
      (data: Respuesta) => {
        this.paginasTotales = data.ordenes.length / 2;
        this.paginasTotales = (data.ordenes.length % 2 === 1 ? this.paginasTotales + 1 : this.paginasTotales );
        this.ordenes = data.ordenes;
        this.paginar();
      }
    )
  }

  paginar() {
    let li = (this.paginaActual === 1 ? 1 : this.paginaActual * 2 - 1);
    let ls = li + 1;
    this.ordenesActuales = this.ordenes.filter(
      (orden, idx) => idx+1 >= li && idx+1 <= ls
    )
  }

  siguiente(){
    this.paginaActual = (this.paginaActual + 1 <= this.paginasTotales ? this.paginaActual + 1 : 1);
    this.paginar();
  }

  anterior() {
    this.paginaActual = (this.paginaActual - 1 === 0 ? 1 : this.paginaActual - 1 );
    this.paginar();
  }

  ngOnInit() {
  }

}
