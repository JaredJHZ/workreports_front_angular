import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //private url:string = 'http://127.0.0.1:5000/login/';

  url:string = 'https://54.234.35.145/login/'



  constructor(
    private http:HttpClient
  ) { }

  setToken(token:String) {
    let tk = token.slice(2,token.length - 1);
    localStorage.setItem("token",tk);
  }

  getInfo() {
    try {
      let info = jwt_decode(this.getToken());
      return info;
    }catch {
      return false;
    }
  }

  getToken(){
    return localStorage.getItem("token");
  }

  login(user:Usuario){
    console.log(this.url);
    return this.http.post(this.url+user.usuario, user);
  }

  logout(){
    localStorage.removeItem("token");
  }

  isLogged():boolean {
    try{
     return this.getToken().length > 0;
    }catch{
      return false;
    }
  }
}
