import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Orden } from '../interfaces/interfaces';

import {saveAs} from 'file-saver';



@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  url:string = 'http://127.0.0.1:5000/ordenes/';

  constructor(private loginService: LoginService, private http: HttpClient) {

   }

   agregarOrden(orden: Orden){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    
    return this.http.post(this.url,orden, {
      headers: headers
    });
    
   }

   getOrden(id: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    
    return this.http.get(this.url+id, {
      headers: headers
    });
   }

   getAllOrdenes(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    console.log(this.url);
    return this.http.get(this.url, {
      headers: headers
    });
   }

   generatePDF(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());

    let pdfUrl = 'http://127.0.0.1:5000/pdf/'+id;

    var mediaType = 'application/pdf';

    let name = "reporte-"+id+" fecha-"+Date.now();

    this.http.get(pdfUrl, {
      headers: headers,
      responseType: 'blob'
    }).subscribe(
      (data) => {
          var blob = new Blob([data], { type: mediaType });
          saveAs(blob, name+'.pdf');
      }
    );
   }

   eliminarOrden(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.delete(this.url+id, {
      headers: headers
    });
   }

   modificarOrden(id, orden) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.put(this.url+id, orden ,{
      headers: headers
    });

   }


   agregarTarea(id,id_tarea) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication',this.loginService.getToken());
    return this.http.post(this.url+"tareas/"+id+"/"+id_tarea , null, {
      headers: headers
    });
  }
   
  eliminarTarea(id,id_tarea){
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('authentication',this.loginService.getToken());
      return this.http.delete(this.url+"tareas/"+id+"/"+id_tarea , {
        headers: headers
      });
    }

    agregarMaterial(id, id_material , material ) {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('authentication',this.loginService.getToken());
      return this.http.post(this.url+"materiales/"+id+"/"+id_material , material ,{
        headers: headers
      });
    }

    eliminarMaterial(id,id_material) {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('authentication',this.loginService.getToken());
      return this.http.delete(this.url+"materiales/"+id+"/"+id_material  ,{
        headers: headers
      });
    }
}
