import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-white p-6">
      <h1
        class="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple mb-4"
      >
        404
      </h1>
      <h2 class="text-2xl font-medium mb-8">Página não encontrada</h2>
      <a
        routerLink="/"
        class="px-8 py-3.5 rounded-full bg-brand-surface border border-brand-border hover:border-brand-pink transition-colors font-medium cursor-pointer"
      >
        Voltar para o início
      </a>
    </div>
  `,
})
export class NotFoundComponent {}
