import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate  {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private Router:Router, private loginService: LoginService){
  
  }

  canActivate(){
    
    if (this.loginService.isLogged()) {
      return true;
    } else {
      this.Router.navigate(['/','login']);
      return false;
    }
  }
}
