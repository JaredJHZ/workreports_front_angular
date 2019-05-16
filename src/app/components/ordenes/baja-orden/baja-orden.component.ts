import { Component, OnInit } from '@angular/core';
import { Orden, Respuesta } from 'src/app/interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-baja-orden',
  templateUrl: './baja-orden.component.html',
  styleUrls: ['./baja-orden.component.css']
})
export class BajaOrdenComponent implements OnInit {
  id:string;
  orden:Orden;

  ngOnInit()  {

  }
  constructor(private ordenService:OrdenesService, private activatedRoute:ActivatedRoute,
    private route:Router) { 
    this.activatedRoute.params.subscribe(
      (params)=> {
        this.id = params['id'];
        this.ordenService.getOrden(this.id)
          .subscribe(
            (data:Respuesta) =>{
              this.orden = data.orden;
            }
          )
      }
    )


  }

  eliminar():void {
    this.ordenService.eliminarOrden(this.id)
          .subscribe(
              (data: Respuesta) => {
                this.regresar();
            }
      )
    }

  regresar():void {
      this.route.navigate(['/']);
  }

}
