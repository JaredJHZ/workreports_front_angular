import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Tarea } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  url:string = 'http://127.0.0.1:5000/tareas/';

  constructor(private http:HttpClient, private loginService: LoginService) {

   }

   agregarTarea(tarea: Tarea){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.post(this.url, tarea, {
      headers: headers
    });

   }

   getAll(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.get(this.url, {
      headers: headers
    });

   }

   getTarea(id:String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.get(this.url+id, {
      headers: headers
    });

   }

   modificarTarea(id: String, tarea: Tarea) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.put(this.url+id, tarea ,{
      headers: headers
    });
   }

   eliminarTarea(id: String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.delete(this.url+id ,{
      headers: headers
    });
   }
   

 
}
