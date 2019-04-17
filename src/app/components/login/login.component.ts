import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name:String = "Login";
  ob = null;
  user:Object = {
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
      (data) => {
        console.log(data);
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
