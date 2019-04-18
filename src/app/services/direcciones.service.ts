import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  url = "http://127.0.0.1:5000/direcciones/"

  constructor(private http:HttpClient, private loginService:LoginService) {

  }

  agregarDireccion(direccion: Object){

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.post(this.url, direccion, {
      headers: headers
    });
  }

  getDirecciones() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.get(this.url, {
      headers: headers
    });
  }

  getDireccion(id:String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.get(this.url+id, {
      headers: headers
    });
  }

}
