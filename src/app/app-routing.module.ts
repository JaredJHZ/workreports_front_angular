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
import { EliminarOrdenComponent } from './components/orden/eliminar-orden/eliminar-orden.component';
import { SeleccionarOrdenComponent } from './components/orden/seleccionar-orden/seleccionar-orden.component';
import { BusquedaOrdenesComponent } from './components/ordenes/busqueda-ordenes/busqueda-ordenes.component';
import { BajaOrdenComponent } from './components/ordenes/baja-orden/baja-orden.component';
import { ConsultaOrdenesComponent } from './components/ordenes/consulta-ordenes/consulta-ordenes.component';
import { ReporteComponent } from './components/ordenes/reporte/reporte.component';

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
    component:ConsultaUsuariosComponent,
    path:'consulta/usuarios'
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
    component:ConsultaMaterialesComponent,
    path:'consulta/materiales'
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
    component:ConsultaEmpleadosComponent,
    path:'consulta/empleados'
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
    component:ConsultaClientesComponent,
    path:'consulta/clientes'
  },
  {
    component:AltasTareasComponent,
    path:'alta/tareas'
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
    component:ConsultaTareasComponent,
    path:'consulta/tareas'
  },
  {
    component:AltaOrdenesComponent,
    path:"alta/ordenes"
  },
  {
    component:BusquedaOrdenesComponent,
    path:'busqueda/ordenes/:tipo'
  },
  {
    component:BajaOrdenComponent,
    path:'ordenes/bajas/:termino/:id'
  },
  {
    component:ConsultaOrdenesComponent,
    path:'consulta/ordenes'
  },
  {
    component:ReporteComponent,
    path:'reporte/orden/:id'
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
