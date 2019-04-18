import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router'
import { Usuario, Token } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name:String = "Login";
  ob = null;
  user:Usuario = {
    usuario : '',
    password: ''
  }
  error: String;

  constructor(private loginService: LoginService, private router: Router) { 
      
  }

  ngOnInit() {
  }

  enter(forma:NgForm):void {
    this.ob = this.loginService.login(this.user).subscribe(
      (data:Token) => {
        if (data) {
          this.loginService.setToken(data.sesion);
          this.ob.unsubscribe();
          this.router.navigate(['/home']);

        }
      },
      (error) => {
        if (error.status === 400) {
          this.error = "Usuario o contraseña invalidos, favor de revisar";
          setTimeout(() => this.error = null, 3000);
        }
      }
    )
  }

}
