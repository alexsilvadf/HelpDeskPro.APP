import { Component } from '@angular/core';
import { LoadingService } from './loading.service';
// ajuste o caminho

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="loadingService.carregando$ | async" class="overlay">
    <div class="d-flex flex-column align-items-center">
      <div class="spinner-border text-warning" style="width: 5rem; height: 5rem; border-width: 10px;" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <div class="mt-5">
      <span class="text-light fs-5 text-primary bg-primary">Carregando...</span>
      </div>
       </div>
    </div>
     
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
    `,
  ],
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
