import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //  email = '';
  password = '';
  erro = '';

   loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });

  

   constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, private messageService: MessageService) {}

   
  ngOnInit(): void {
  
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get senha() {
    return this.loginForm.get('senha')!;
  }



  login() {
    this.auth.login(this.loginForm.controls.email.value as any, this.loginForm.controls.senha.value as any).subscribe({
      next: (res) => {
        this.auth.setToken(res.resposta);
        this.router.navigate(['/home']);
      },
      error: () => {
          this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Usuário ou senha inválidos',
        });
      }
    });
  }

}
