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
import { MenuComponent } from './components/menu/menu.component';
import { AgregarComponent } from './components/menu/agregar/agregar.component';
import { SeleccionarComponent } from './components/seleccionar/seleccionar.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { ConsultarComponent } from './components/menu/consultar/consultar.component';
import { EliminarComponent } from './components/menu/eliminar/eliminar.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { AgregarTareaComponent } from './components/tareas/agregar-tarea/agregar-tarea.component';
import { ConsultarTareaComponent } from './components/tareas/consultar-tarea/consultar-tarea.component';
import { SeleccionarTareaComponent } from './components/tareas/seleccionar-tarea/seleccionar-tarea.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    MenuComponent,
    AgregarComponent,
    SeleccionarComponent,
    ModificarComponent,
    ConsultarComponent,
    EliminarComponent,
    TareasComponent,
    AgregarTareaComponent,
    ConsultarTareaComponent,
    SeleccionarTareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
