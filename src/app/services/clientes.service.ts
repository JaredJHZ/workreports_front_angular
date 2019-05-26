import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Cliente } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  //private url: string = 'http://127.0.0.1:5000/clientes/';
  url:string = 'https://54.234.35.145/clientes/';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  agregarCliente(cliente: Cliente) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.post(this.url, cliente, {
      headers: headers
    });
  }

  getClientes(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.get(this.url, {
      headers: headers
    });
  }

  getCliente(id: String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.get(this.url+id, {
      headers: headers
    });
  }

  modificarCliente(id: String, cliente: Cliente) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.put(this.url+id,cliente ,{
      headers: headers
    });
  }

  eliminarCliente(id: String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    return this.http.delete(this.url+id ,{
      headers: headers
    });
  }
}
