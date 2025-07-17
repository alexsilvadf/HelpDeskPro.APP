import { NgModule } from "@angular/core";
import { ListarDepartamentoComponent } from "./listar-departamento/listar-departamento.component";
import { CommonModule } from "@angular/common";
import { CategoriaRoutingModule } from "../categoria/categoria-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";

@NgModule({
  declarations: [ListarDepartamentoComponent],
  exports: [],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class CategoriaModule {}