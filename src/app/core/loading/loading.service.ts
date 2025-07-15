import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private carregandoSubject = new BehaviorSubject<boolean>(false);
  public carregando$ = this.carregandoSubject.asObservable();
  private requisicoesAtivas = 0;

  mostrar() {
    this.requisicoesAtivas++;
    this.carregandoSubject.next(true);
  }

  esconder() {
    this.requisicoesAtivas--;
    if (this.requisicoesAtivas <= 0) {
      this.carregandoSubject.next(false);
      this.requisicoesAtivas = 0;
    }
  }
}
