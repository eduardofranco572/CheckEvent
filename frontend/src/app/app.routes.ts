import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent,
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/auth/signup/signup.component').then((m) => m.SignupComponent),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'criar-evento',
        loadComponent: () =>
          import('./features/events/create-event/create-event.component').then(
            (m) => m.CreateEventComponent,
          ),
      },
      {
        path: 'editar-evento/:id',
        loadComponent: () =>
          import('./features/events/create-event/create-event.component').then(
            (m) => m.CreateEventComponent,
          ),
      },
      {
        path: 'evento/:id',
        loadComponent: () =>
          import('./features/events/view-event/view-event.component').then(
            (m) => m.ViewEventComponent,
          ),
      },
      {
        path: 'meus-eventos',
        loadComponent: () =>
          import('./features/events/my-events/my-events.component').then(
            (m) => m.MyEventsComponent,
          ),
      },
    ],
  },

  {
    path: '404',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },

  { path: '**', redirectTo: '404' },
];
