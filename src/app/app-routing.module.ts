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
