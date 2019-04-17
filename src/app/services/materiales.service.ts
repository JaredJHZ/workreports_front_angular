import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  url = "http://127.0.0.1:5000/materiales/"

  constructor(private loginService:LoginService, private http:HttpClient) { 

  }

  agregarMaterial(material: Object){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.post(this.url, material, {
      headers: headers
    });
  }




}
