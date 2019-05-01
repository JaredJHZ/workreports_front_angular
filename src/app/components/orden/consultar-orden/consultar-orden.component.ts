import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-consultar-orden',
  templateUrl: './consultar-orden.component.html',
  styleUrls: ['./consultar-orden.component.css']
})
export class ConsultarOrdenComponent implements OnInit {

  constructor(private ordenService: OrdenesService) {
    this.ordenService.getOrden('1')
        .subscribe(
          (data) => console.log(data)
        )
   }

  ngOnInit() {
  }

}
