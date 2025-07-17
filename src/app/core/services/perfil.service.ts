import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl = environment.urlApi;

  constructor(private http: HttpClient) { }

  getPerfis(status?: number): Observable<any>{
    let params: any = {};
 
    if(status !== undefined && status !== null){
      params.status = status;
    }
    return this.http.get(`${this.baseUrl}/perfil`, {params});
  }

   getPerfil(codigo: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/perfil/${codigo}`);
  }


  excluirPerfil(codigo: number){
    return this.http.delete<{mensagem: string}>(`${this.baseUrl}/perfil/${codigo}`);
  }

    adicionarPerfil(perfil: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/perfil`, perfil);
  }
}
