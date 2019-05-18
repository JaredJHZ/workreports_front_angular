import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AltasTareasComponent } from './components/tareas/altas-tarea/altas-tarea.component';


// datepicker

import {OwlRadioModule} from 'owl-ng'
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AltaMaterialComponent } from './components/materiales/alta-material/alta-material.component';
import { AltasEmpleadosComponent } from './components/empleados/altas-empleados/altas-empleados.component';
import { AltaClientesComponent } from './components/clientes/alta-clientes/alta-clientes.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { AlertaComponent } from './components/alerta/alerta.component';
import { BusquedaMaterialesComponent } from './components/materiales/busqueda-materiales/busqueda-materiales.component';
import { BajaMaterialesComponent } from './components/materiales/baja-materiales/baja-materiales.component';
import { BajaEmpleadosComponent } from './components/empleados/baja-empleados/baja-empleados.component';
import { BusquedaEmpleadosComponent } from './components/empleados/busqueda-empleados/busqueda-empleados.component';
import { BusquedaClientesComponent } from './components/clientes/busqueda-clientes/busqueda-clientes.component';
import { BajaClientesComponent } from './components/clientes/baja-clientes/baja-clientes.component';
import { BusquedaTareasComponent } from './components/tareas/busqueda-tareas/busqueda-tareas.component';
import { BajaTareasComponent } from './components/tareas/baja-tareas/baja-tareas.component';
import { ModificarMaterialComponent } from './components/materiales/modificar-material/modificar-material.component';
import { ModificarEmpleadoComponent } from './components/empleados/modificar-empleado/modificar-empleado.component';
import { ModificarClienteComponent } from './components/clientes/modificar-cliente/modificar-cliente.component';
import { ModificarTareasComponent } from './components/tareas/modificar-tareas/modificar-tareas.component';
import { AltaUsuarioComponent } from './components/usuarios/alta-usuario/alta-usuario.component';
import { BusquedaUsuariosComponent } from './components/usuarios/busqueda-usuarios/busqueda-usuarios.component';
import { BajaUsuariosComponent } from './components/usuarios/baja-usuarios/baja-usuarios.component';
import { ModificarUsuarioComponent } from './components/usuarios/modificar-usuario/modificar-usuario.component';
import { ConsultaMaterialesComponent } from './components/materiales/consulta-materiales/consulta-materiales.component';
import { ConsultaUsuariosComponent } from './components/usuarios/consulta-usuarios/consulta-usuarios.component';
import { ConsultaEmpleadosComponent } from './components/empleados/consulta-empleados/consulta-empleados.component';
import { ConsultaClientesComponent } from './components/clientes/consulta-clientes/consulta-clientes.component';
import { ConsultaTareasComponent } from './components/tareas/consulta-tareas/consulta-tareas.component';
import { AltaOrdenesComponent } from './components/ordenes/alta-ordenes/alta-ordenes.component';
import { BusquedaOrdenesComponent } from './components/ordenes/busqueda-ordenes/busqueda-ordenes.component';
import { BajaOrdenComponent } from './components/ordenes/baja-orden/baja-orden.component';
import { ConsultaOrdenesComponent } from './components/ordenes/consulta-ordenes/consulta-ordenes.component';
import { ReporteComponent } from './components/ordenes/reporte/reporte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    AltaMaterialComponent,
    AltasEmpleadosComponent,
    AltaClientesComponent,
    AltasTareasComponent,
    CarruselComponent,
    AlertaComponent,
    BusquedaMaterialesComponent,
    BajaMaterialesComponent,
    BajaEmpleadosComponent,
    BusquedaEmpleadosComponent,
    BusquedaClientesComponent,
    BajaClientesComponent,
    BusquedaTareasComponent,
    BajaTareasComponent,
    ModificarMaterialComponent,
    ModificarEmpleadoComponent,
    ModificarClienteComponent,
    ModificarTareasComponent,
    AltaUsuarioComponent,
    BusquedaUsuariosComponent,
    BajaUsuariosComponent,
    ModificarUsuarioComponent,
    ConsultaMaterialesComponent,
    ConsultaUsuariosComponent,
    ConsultaEmpleadosComponent,
    ConsultaClientesComponent,
    ConsultaTareasComponent,
    AltasTareasComponent,
    AltaOrdenesComponent,
    BusquedaOrdenesComponent,
    BajaOrdenComponent,
    ConsultaOrdenesComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    OwlRadioModule,
    OwlDateTimeModule,
     OwlNativeDateTimeModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
