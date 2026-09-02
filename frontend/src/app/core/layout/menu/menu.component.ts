import { Component, inject, signal, afterNextRender } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  private userService = inject(UserService);

  initials = signal('--');

  constructor() {
    afterNextRender(() => {
      this.userService.getMe().subscribe({
        next: (user) => {
          if (user && user.name) {
            const names = user.name.trim().split(' ');

            if (names.length >= 2) {
              this.initials.set((names[0][0] + names[names.length - 1][0]).toUpperCase());
            } else {
              this.initials.set(names[0].substring(0, 2).toUpperCase());
            }
          }
        },
        error: (err) => console.error('Erro ao carregar usuário', err),
      });
    });
  }
}
