import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.urlApi}/Authentication`; //'http://localhost:8080/api/Authentication';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // return this.http.post<any>(`${this.api}/login`, { email, password });
    return this.http.post<any>(`${this.api}/login`, { email, password });
  }

  setToken(token: any) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    //const { exp }: any = jwtDecode(token);
    //return (exp * 1000) > Date.now();

    return true;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');
    localStorage.removeItem('menus');
    localStorage.removeItem('departamento');
  }

  getPerfil(): string {
    return localStorage.getItem('perfil') || '';
  }

  getMenus(): any[] {
    const menus = localStorage.getItem('menus');
    return menus ? JSON.parse(menus) : [];
  }

  salvarLogin(token: string, perfil: string, departamento: string,  menus: any[]) {
    localStorage.setItem('token', token);
    localStorage.setItem('perfil', perfil);
    localStorage.setItem('departamento', departamento);
    localStorage.setItem('menus', JSON.stringify(menus));
  }

  // logout() {
  //   localStorage.clear();
  // }
}
