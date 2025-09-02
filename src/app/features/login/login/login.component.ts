import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //  email = '';
  password = '';
  erro = '';
  isLoading: boolean = false;


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email')!;
  }

  get senha() {
    return this.loginForm.get('senha')!;
  }

  login() {
  this.loadingService.mostrar();
    this.auth
      .login(
        this.loginForm.controls.email.value as any,
        this.loginForm.controls.senha.value as any
      )
      .subscribe({
        next: (res) => {
 this.loadingService.esconder(); // termina o loading
          this.auth.salvarLogin(
            res.resposta.token,
            res.resposta.perfil,
            res.resposta.departamento,
            res.resposta.menus
          );

          if (res.resposta.perfil === 'Suport') {
            this.router.navigate(['/atender-chamado']);
          } else {
            this.router.navigate(['/listar-chamado']);
          }
        },
        error: () => {
             this.loadingService.esconder(); // termina o loading
          this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Usuário ou senha inválidos',
          });
        },
      });
  }
}
