import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ListarCargoComponent } from './listar-cargo/listar-cargo.component';

@NgModule({
  declarations: [ListarCargoComponent],
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
export class CargoModule {}
