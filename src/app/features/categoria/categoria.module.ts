import { NgModule } from '@angular/core';
import { ListarCategoriaComponent } from './listar-categoria/listar-categoria.component';
import { CommonModule } from '@angular/common';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ListarCategoriaComponent],
  exports: [],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class CategoriaModule {}
