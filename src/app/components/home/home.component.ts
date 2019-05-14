import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario:Usuario;
  menu:String[] = [];
  altas:string = 'seleccionar';
  bajas:string = 'seleccionar';
  modificaciones:string ='seleccionar';
  consultas:string;

  constructor(private loginService: LoginService, private router:Router) {
    this.usuario = this.loginService.getInfo();

   }

  ngOnInit() {
    
  }

  changeAltas():void {
    if(this.altas !== 'seleccionar'){
      this.router.navigate(['/alta',this.altas]);
    }
  }

  changeBajas():void {
    if(this.bajas !== 'seleccionar') {
      this.router.navigate(['/busqueda',this.bajas,'bajas']);
    }
  }

  changeModificaciones():void {
    if(this.modificaciones !== 'seleccionar') {
      this.router.navigate(['/busqueda',this.modificaciones,'modificaciones'])
    }
  }

  changeConsultas():void {
    console.log(this.consultas);
  }

}
