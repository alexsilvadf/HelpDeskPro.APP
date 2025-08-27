import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ListarPerfilComponent } from './listar-perfil/listar-perfil.component';

@NgModule({
  declarations: [ListarPerfilComponent],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class CategoriaModule {}
