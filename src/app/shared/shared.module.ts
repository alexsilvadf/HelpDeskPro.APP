import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button/button.component';
import { TableComponent } from './components/table/table/table.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';







@NgModule({
  declarations: [ButtonComponent, TableComponent],
  exports: [
    ButtonComponent,
    CardModule,
    PanelModule,
    AutoCompleteModule,
    DropdownModule,
    ReactiveFormsModule,
    TableModule,
    TableComponent,
    FontAwesomeModule,
    
  ],
  imports: [CommonModule, TableModule, FontAwesomeModule  ],
})
export class SharedModule {}
