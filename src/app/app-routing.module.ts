import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { ListarCategoriaComponent } from './features/categoria/listar-categoria/listar-categoria.component';

const routes: Routes = [
  {path: '', component: AppLayoutComponent, 
    children: [
  {path: 'categoria', component: ListarCategoriaComponent},
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
