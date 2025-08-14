import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  // canActivate(): boolean {
  //   if (this.auth.isAuthenticated()) {
  //     return true;
  //   }
  //      this.router.navigate(['']);
  //   return false;
  // }

  canActivate(route: ActivatedRouteSnapshot): boolean {
   const perfilNecessario = (route.firstChild?.data['perfil'] as string[]) || [];
    const perfilUsuario = this.auth.getPerfil()?.trim().toLowerCase() || '';

   const permitido =
      !perfilNecessario.length ||
      perfilNecessario.some(p => p.trim().toLowerCase() === perfilUsuario);


    if (!permitido) {
      // Redireciona para outra rota (ex.: /home ou /acesso-negado)
      this.router.navigate(['/listar-chamado']);
      return false;
    }

    return true;
  }
}
