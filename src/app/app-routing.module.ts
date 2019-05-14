import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { GuardGuard } from './guards/guard.guard';

import { AltaMaterialComponent } from './components/materiales/alta-material/alta-material.component';
import { AltasEmpleadosComponent } from './components/empleados/altas-empleados/altas-empleados.component';
import { AltaClientesComponent } from './components/clientes/alta-clientes/alta-clientes.component';
import { AltasTareasComponent } from './components/tareas/altas-tarea/altas-tarea.component';
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

const routes: Routes = [
  {
    component:LoginComponent,
    path:'login'
  },
  {
    component: HomeComponent,
    path:'home',
    canActivate:[GuardGuard]
  },
  {
    component:AltaUsuarioComponent,
    path:'alta/usuarios',
    canActivate:[GuardGuard]
  },
  {
    component:BusquedaUsuariosComponent,
    path:'busqueda/usuarios/:tipo'
  },
  {
    component: BajaUsuariosComponent,
    path:'usuarios/bajas/:termino/:id'
  },
  {
    component: ModificarUsuarioComponent,
    path:'usuarios/modificaciones/:termino/:id'
  },
  {
    component:AltaMaterialComponent,
    path:'alta/materiales',
    canActivate:[GuardGuard]
  },
  {
    component:BusquedaMaterialesComponent,
    path:'busqueda/materiales/:tipo'
  }
  ,
  {
    component: BajaMaterialesComponent,
    path:'materiales/bajas/:termino/:id'
  },
  {
    component: ModificarMaterialComponent,
    path:'materiales/modificaciones/:termino/:id'
  },
  {
    component:AltasEmpleadosComponent,
    path:'alta/empleados'
  },
  {
    component:BusquedaEmpleadosComponent,
    path:'busqueda/empleados/:tipo'
  },
  {
    component:BajaEmpleadosComponent,
    path:'empleados/bajas/:apellidop/:apellidom/:nombre/:id'
  },
  {
    component:ModificarEmpleadoComponent,
    path:'empleados/modificaciones/:apellidop/:apellidom/:nombre/:id'
  },
  {
    component:AltasTareasComponent,
    path:'alta/tareas'
  },
  {
    component:AltaClientesComponent,
    path:'alta/clientes'
  },
  {
    component:BusquedaClientesComponent,
    path:'busqueda/clientes/:tipo'
  },
  {
    component:BajaClientesComponent,
    path:'clientes/bajas/:apellidop/:apellidom/:nombre/:id'
  },
  {
    component:ModificarClienteComponent,
    path:'clientes/modificaciones/:apellidop/:apellidom/:nombre/:id'
  },
  {
    component:BusquedaTareasComponent,
    path:'busqueda/tareas/:tipo'
  },
  {
    component:ModificarTareasComponent,
    path:'tareas/modificaciones/:termino/:id'
  },
  {
    component:BajaTareasComponent,
    path:'tareas/bajas/:termino/:id'
  },
  {
    path:'**',
    redirectTo:'/home'
  },
  { path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
