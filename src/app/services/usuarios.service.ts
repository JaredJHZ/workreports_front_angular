import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url:string = 'http://127.0.0.1:5000/usuarios/';
  //url:string = 'http://ec2-3-121-195-173.eu-central-1.compute.amazonaws.com/usuario/'

  constructor(private loginService:LoginService, private http: HttpClient) {
      
   }

   agregarUsuario(usuario) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    console.log(this.url);
    return this.http.post(this.url, usuario, {
      headers: headers
    });
   }

   modificarUsuario(id, usuario) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.put(this.url+'update/'+id, usuario, {
      headers: headers
    });
   }

   getUsuarios() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.get(this.url, {
      headers: headers
    });
   }

   getUsuario(id:String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.get(this.url+id, {
      headers: headers
    });
   }

   eliminarUsuario(id:String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.delete(this.url+'delete/'+id, {
      headers: headers
    });
   }


}
