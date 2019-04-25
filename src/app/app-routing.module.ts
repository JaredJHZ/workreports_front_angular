import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { GuardGuard } from './guards/guard.guard';
import { MenuComponent } from './components/menu/menu.component';
import { AgregarComponent } from './components/menu/agregar/agregar.component';
import { SeleccionarComponent } from './components/seleccionar/seleccionar.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { ConsultarComponent } from './components/menu/consultar/consultar.component';
import { EliminarComponent } from './components/menu/eliminar/eliminar.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { AgregarTareaComponent } from './components/tareas/agregar-tarea/agregar-tarea.component';
import { SeleccionarTareaComponent } from './components/tareas/seleccionar-tarea/seleccionar-tarea.component';
import { ConsultarTareaComponent } from './components/tareas/consultar-tarea/consultar-tarea.component';
import { ModificarTareaComponent } from './componennts/tareas/modificar-tarea/modificar-tarea.component';
import { EliminarTareaComponent } from './components/tareas/eliminar-tarea/eliminar-tarea.component';

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
      path:':tipo/modificar/:id',
      component: ModificarComponent
  },
  {
    path:':tipo/consultar/:id',
    component: ConsultarComponent
  },
  {
    path:':tipo/eliminar/:id',
    component: EliminarComponent
  },
  {
    path:'tareas',
    component:TareasComponent
  },
  {
    path:'tareas/agregar',
    component:AgregarTareaComponent
  },
  {
    path:'tareas/seleccionar/:tipo',
    component: SeleccionarTareaComponent
  },
  {
    path:'tareas/seleccionar/consultar/:id',
    component:ConsultarTareaComponent
  },
  {
    path: 'tareas/seleccionar/modificar/:id',
    component: ModificarTareaComponent
  },
  {
    path:'tareas/seleccionar/eliminar/:id',
    component: EliminarTareaComponent
  }
  ,
  {

    component: MenuComponent,
    path:'menu/:tipo',
    canActivate:[GuardGuard],
    children: [{
                component: AgregarComponent,
                path:'agregar/:tipo',
              },
              {
                path:':accion/:tipo',
                component: SeleccionarComponent
               }
            ]
  },
  {
    path:'**',
    component:HomeComponent
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
