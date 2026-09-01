import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {
  private router = inject(Router);

  get isSignup(): boolean {
    return this.router.url.includes('signup');
  }

  get title(): string {
    return this.isSignup ? 'Crie sua conta' : 'Bem-vindo de volta';
  }

  get subtitle(): string {
    return this.isSignup 
      ? 'Cadastre-se para participar e gerenciar seus eventos.' 
      : 'Entre para acompanhar suas inscrições e eventos.';
  }
}