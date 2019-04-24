import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Empleado } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private url:string = 'http://127.0.0.1:5000/empleados/';

  constructor(private http: HttpClient, private loginService: LoginService) { }


  agregarEmpleado(empleado: Empleado) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.post(this.url, empleado, {
      headers: headers
    });
  }

  getEmpleados() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.get(this.url, {
      headers: headers
    });
  }

  getEmpleado(id: String){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.get(this.url+id, {
      headers: headers
    });
  }

  modificarEmpleado(id: String, empleado: Empleado) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.put(this.url+id,empleado ,{
      headers: headers
    });
  }

  eliminarEmpleado(id: String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.delete(this.url+id ,{
      headers: headers
    });
  }

}
