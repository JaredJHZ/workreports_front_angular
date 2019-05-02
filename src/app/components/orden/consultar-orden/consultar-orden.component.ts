import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ActivatedRoute } from '@angular/router';
import { Respuesta, Orden } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-consultar-orden',
  templateUrl: './consultar-orden.component.html',
  styleUrls: ['./consultar-orden.component.css']
})
export class ConsultarOrdenComponent implements OnInit {

  id:string;
  orden: Orden;

  constructor(private ordenService: OrdenesService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params
        .subscribe(
          (parametros) => {
            this.id = parametros.id
            this.ordenService.getOrden(this.id)
                .subscribe(
                  (data: Respuesta) => {
                    this.orden = data.orden
                  }
                )
          }
        )
       
  }

  generatePDF():void{
    
    this.ordenService.generatePDF(this.id);
  
  }
  

  ngOnInit() {
  }

}
