import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  //url = "http://127.0.0.1:5000/materiales/"
  url:string = 'https://54.234.35.145/materiales/'

  constructor(private loginService:LoginService, private http:HttpClient) { 

  }

  agregarMaterial(material: Object){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.post(this.url, material, {
      headers: headers
    });
  }


  getTodosMateriales() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.get(this.url, {
      headers: headers
    });
  }

  getMaterial(id:String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.get(this.url+id, {
      headers: headers
    });
  }

  modifyMaterial(id:String, material) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.put(this.url+id, material, {
      headers: headers
    });
  }

  eliminarMaterial(id:String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    console.log(this.url+id);
    return this.http.delete(this.url+id, {
      headers: headers
    });
  }




}
