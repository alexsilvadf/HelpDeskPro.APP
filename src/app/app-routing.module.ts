import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { ListarCategoriaComponent } from './features/categoria/listar-categoria/listar-categoria.component';
import { ManterCategoriaComponent } from './features/categoria/manter-categoria/manter-categoria.component';
import { ListarDepartamentoComponent } from './features/departamento/listar-departamento/listar-departamento.component';
import { ListarCargoComponent } from './features/cargo/listar-cargo/listar-cargo.component';
import { ListarPerfilComponent } from './features/perfil/listar-perfil/listar-perfil.component';
import { LoginComponent } from './features/login/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { ListarChamadoComponent } from './features/chamado/listar-chamado/listar-chamado.component';
import { ManterChamadoComponent } from './features/chamado/manter-chamado/manter-chamado.component';
import { AtenderChamadoComponent } from './features/chamado/atender-chamado/atender-chamado.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: AppLayoutComponent, canActivate: [AuthGuard],  data: { perfil: ['Administrador', 'Gerente', 'User', 'Suport'] } },
      {
        path: 'categoria',
        component: ListarCategoriaComponent,
        canActivate: [AuthGuard],
         data: { perfil: ['Administrador', 'Gerente'] }
      },
      {
        path: 'manterCategoria',
        component: ManterCategoriaComponent,
        canActivate: [AuthGuard],
         data: { perfil: ['Administrador', 'Gerente'] }
      },
      {
        path: 'departamento',
        component: ListarDepartamentoComponent,
        canActivate: [AuthGuard],
         data: { perfil: ['Administrador', 'Gerente'] }
      },
      {
        path: 'cargo',
        component: ListarCargoComponent,
        canActivate: [AuthGuard],
         data: { perfil: ['Administrador', 'Gerente'] }
      },
      {
        path: 'perfil',
        component: ListarPerfilComponent,
        canActivate: [AuthGuard],
         data: { perfil: ['Administrador'] }
      },
      {
        path: 'listar-chamado',
        component: ListarChamadoComponent,
        canActivate: [AuthGuard],
        data: { perfil: ['Administrador', 'Gerente', 'User'] }
      },
      {
        path: 'manter-chamado',
        component: ManterChamadoComponent,
        canActivate: [AuthGuard],
         data: { perfil: ['Administrador', 'Gerente', 'User'] }
       
      },
       {
        path: 'atender-chamado',
        component: AtenderChamadoComponent,
        canActivate: [AuthGuard],
         data: { perfil: ['Administrador', 'Gerente', 'Suport'] }
       
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
