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

  constructor(private loginService: LoginService, private router:Router) {
    this.usuario = this.loginService.getInfo();
    if (this.usuario.permission === 'ADMIN') {
      this.menu.push("usuarios");
      this.menu.push("clientes");
      this.menu.push("empleados");
      this.menu.push("materiales");
      this.menu.push("direcciones");
    
    } else {
      this.menu.push("clientes");
      this.menu.push("empleados");
      this.menu.push("materiales");
      this.menu.push("direcciones");
    }
   }

  ngOnInit() {
    
  }

}
