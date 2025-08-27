import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private baseUrl = environment.urlApi;

  constructor(private http: HttpClient) { }

  getDepartamentos(status?: number): Observable<any>{
    let params: any = {};
 
    if(status !== undefined && status !== null){
      params.status = status;
    }
    return this.http.get(`${this.baseUrl}/departamento`, {params});
  }

   getDepartamento(codigo: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/categoria/${codigo}`);
  }


  excluirDepartamento(codigo: number){
    return this.http.delete<{mensagem: string}>(`${this.baseUrl}/departamento/${codigo}`);
  }

    adicionarDepartamento(departamento: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/departamento`, departamento);
  }
}
