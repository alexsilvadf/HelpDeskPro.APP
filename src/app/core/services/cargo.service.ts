import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private baseUrl = environment.urlApi;

  constructor(private http: HttpClient) { }

  getCargos(status?: number): Observable<any>{
    let params: any = {};
 
    if(status !== undefined && status !== null){
      params.status = status;
    }
    return this.http.get(`${this.baseUrl}/cargo`, {params});
  }

   getCargo(codigo: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/cargo/${codigo}`);
  }


  excluirCargo(codigo: number){
    return this.http.delete<{mensagem: string}>(`${this.baseUrl}/cargo/${codigo}`);
  }

    adicionarCargo(cargo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cargo`, cargo);
  }
}
