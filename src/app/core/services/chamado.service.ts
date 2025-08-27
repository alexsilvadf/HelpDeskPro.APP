import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private baseUrl = environment.urlApi;

  constructor(private http: HttpClient) { }

  getChamados(params: any): Observable<any>{   
    return this.http.post(`${this.baseUrl}/chamado/buscarTodos`, params);
  }

  //  getCategoria(codigo: number): Observable<any>{
  //   return this.http.get(`${this.baseUrl}/categoria/${codigo}`);
  // }


  excluirChamado(codigo: number){
    return this.http.delete<{mensagem: string}>(`${this.baseUrl}/chamado/Excluir/${codigo}`);
  }

    adicionarChamado(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/chamado/adicionar`, formData);
  }

    atualizarChamado(statusChamado: number, resolucaoProblema: string, numeroChamado: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/chamado/atualizar/`, {statusChamado, resolucaoProblema, numeroChamado});
  }
}
