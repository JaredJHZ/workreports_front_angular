import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() usuario:String;
  @Input() permiso:String;

  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit() {
  }

  salir(){
    this.loginService.logout();
    this.router.navigate(['/','login']);
  }

}
