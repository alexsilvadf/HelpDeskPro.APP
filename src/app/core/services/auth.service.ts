import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthService {

  

  private api = 'https://localhost:7101/api/Authentication';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
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
  }

  getPerfil(): string {
    return localStorage.getItem('perfil') || '';
  }

   getMenus(): any[] {
    const menus = localStorage.getItem('menus');
    return menus ? JSON.parse(menus) : [];
  }

   salvarLogin(token: string, perfil: string, menus: any[]) {
    localStorage.setItem('token', token);
    localStorage.setItem('perfil', perfil);
    localStorage.setItem('menus', JSON.stringify(menus));
  }

  // logout() {
  //   localStorage.clear();
  // }

}
