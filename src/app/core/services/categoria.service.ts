import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl = environment.urlApi;

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any>{
    return this.http.get(`${this.baseUrl}/categoria`);
  }

  excluirCategoria(codigo: number){
    return this.http.delete<{mensagem: string}>(`${this.baseUrl}/categoria/${codigo}`);
  }
  //   adicionarCategoria(categoria: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/api/categorias`, categoria);
  // }
}
