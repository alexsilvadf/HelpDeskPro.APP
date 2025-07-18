import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListarCategoriaComponent } from './features/categoria/listar-categoria/listar-categoria.component';
import { ManterCategoriaComponent } from './features/categoria/manter-categoria/manter-categoria.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoadingComponent } from './core/loading/loading.component';
import { LoadingInterceptor } from './core/loading/loading.interceptor';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AppMenuComponent } from './layout/app-menu/app-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarCategoriaComponent,
    ManterCategoriaComponent,
    LoadingComponent,
    AppLayoutComponent,
    AppMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Necessário para animações do PrimeNG
    ButtonModule,
    AppRoutingModule,
    HttpClientModule,
    CalendarModule,
    SharedModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
