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
import { ReportesComponent } from './ordenes/busqueda/reportes/reportes.component';
import { ModificarOrdenComponent } from './components/ordenes/modificar-orden/modificar-orden.component';
import { BusquedaTareaOrdenComponent } from './ordenes/busqueda-tarea-orden/busqueda-tarea-orden.component';
import { BusquedaMaterialesOrdenComponent } from './ordenes/busqueda-materiales-orden/busqueda-materiales-orden.component';

const routes: Routes = [
  {
    component:LoginComponent,
    path:'login'
  },
  {
    component: ReportesComponent,
    path:'reporte/:tipo'
  },
  {
    component: ReporteComponent,
    path:'reporte/:tipo/:id'
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
    path:'busqueda/usuarios/:tipo',
    canActivate:[GuardGuard]
  },
  {
    component: BajaUsuariosComponent,
    path:'usuarios/bajas/:termino/:id',
    canActivate:[GuardGuard]
  },
  {
    component: ModificarUsuarioComponent,
    path:'usuarios/modificaciones/:termino/:id',
    canActivate:[GuardGuard]
  },
  {
    component:ConsultaUsuariosComponent,
    path:'consulta/usuarios',
    canActivate:[GuardGuard]
  },
  {
    component:AltaMaterialComponent,
    path:'alta/materiales',
    canActivate:[GuardGuard]
  },
  {
    component:BusquedaMaterialesComponent,
    path:'busqueda/materiales/:tipo',
    canActivate:[GuardGuard]
  }
  ,
  {
    component: BajaMaterialesComponent,
    path:'materiales/bajas/:termino/:id',
    canActivate:[GuardGuard]
  },
  {
    component: ModificarMaterialComponent,
    path:'materiales/modificaciones/:termino/:id',
    canActivate:[GuardGuard]
  },
  {
    component:ConsultaMaterialesComponent,
    path:'consulta/materiales',
    canActivate:[GuardGuard]
  },
  {
    component:AltasEmpleadosComponent,
    path:'alta/empleados',
    canActivate:[GuardGuard]
  },
  {
    component:BusquedaEmpleadosComponent,
    path:'busqueda/empleados/:tipo',
    canActivate:[GuardGuard]
  },
  {
    component:BajaEmpleadosComponent,
    path:'empleados/bajas/:apellidop/:apellidom/:nombre/:id',
    canActivate:[GuardGuard]
  },
  {
    component:ModificarEmpleadoComponent,
    path:'empleados/modificaciones/:apellidop/:apellidom/:nombre/:id',
    canActivate:[GuardGuard]
  },
  {
    component:ConsultaEmpleadosComponent,
    path:'consulta/empleados',
    canActivate:[GuardGuard]
  },
  {
    component:AltaClientesComponent,
    path:'alta/clientes',
    canActivate:[GuardGuard]
  },
  {
    component:BusquedaClientesComponent,
    path:'busqueda/clientes/:tipo',
    canActivate:[GuardGuard]
  },
  {
    component:BajaClientesComponent,
    path:'clientes/bajas/:apellidop/:apellidom/:nombre/:id',
    canActivate:[GuardGuard]
  },
  {
    component:ModificarClienteComponent,
    path:'clientes/modificaciones/:apellidop/:apellidom/:nombre/:id',
    canActivate:[GuardGuard]
  },
  {
    component:ConsultaClientesComponent,
    path:'consulta/clientes',
    canActivate:[GuardGuard]
  },
  {
    component:AltasTareasComponent,
    path:'alta/tareas',
    canActivate:[GuardGuard]
  },
  {
    component:BusquedaTareasComponent,
    path:'busqueda/tareas/:tipo',
    canActivate:[GuardGuard]
  },
  {
    component:ModificarTareasComponent,
    path:'tareas/modificaciones/:termino/:id',
    canActivate:[GuardGuard]
  },
  {
    component:BajaTareasComponent,
    path:'tareas/bajas/:termino/:id',
    canActivate:[GuardGuard]
  },
  {
    component:ConsultaTareasComponent,
    path:'consulta/tareas',
    canActivate:[GuardGuard]
  },
  {
    component:AltaOrdenesComponent,
    path:"alta/ordenes",
    canActivate:[GuardGuard]
  },
  {
    component:BusquedaOrdenesComponent,
    path:'busqueda/ordenes/:tipo',
    canActivate:[GuardGuard]
  },
  {
    component:BajaOrdenComponent,
    path:'ordenes/bajas/:termino/:id',
    canActivate:[GuardGuard]
  },
  {
    component:ModificarOrdenComponent,
    path:'ordenes/modificaciones/:termino/:id',
    canActivate:[GuardGuard]
  },
  {
    component: BusquedaTareaOrdenComponent,
    path:':tipo/tareaordenes',
    canActivate:[GuardGuard]
  },
  {
    component: BusquedaMaterialesOrdenComponent,
    path:':tipo/materialordenes',
    canActivate:[GuardGuard]
  }
  ,
  {
    component:ConsultaOrdenesComponent,
    path:'consulta/ordenes',
    canActivate:[GuardGuard]
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
