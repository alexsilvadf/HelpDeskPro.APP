import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarCategoriaComponent } from "./listar-categoria/listar-categoria.component";

const routes: Routes = [
{path: '', component: ListarCategoriaComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }