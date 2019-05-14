import { Component, OnInit, ɵConsole } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta, Orden } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-orden',
  templateUrl: './eliminar-orden.component.html',
  styleUrls: ['./eliminar-orden.component.css']
})
export class EliminarOrdenComponent implements OnInit {

  id:string;
  orden:Orden;

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
    Swal.fire({
      title: '¿Está seguro?',
      text: "¿Desea realizar la operación?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "aceptar"
    }).then((result) => {
        if(result.value) {
          this.ordenService.eliminarOrden(this.id)
                .subscribe(
                  (data: Respuesta) => {
                    this.regresar();
                  }
                )
        }
    });
  }

  regresar():void {
      this.route.navigate(['/orden']);
  }

  ngOnInit() {
  }

}
