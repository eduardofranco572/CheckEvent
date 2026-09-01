import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadComponent: () => {
      return import('./features/auth/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent);
    },
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'signup', loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => {
      return import('./features/home/home.component').then(m => m.HomeComponent);
    }
  },

  { path: '**', redirectTo: '' }
];