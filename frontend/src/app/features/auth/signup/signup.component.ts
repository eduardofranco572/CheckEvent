import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = false;

  onSubmit() {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    const { name, email, password } = this.signupForm.value;

    this.authService.signup(name!, email!, password!).subscribe({
      next: (token) => {
        this.authService.setToken(token);
        this.toastService.success('Conta criada com sucesso!');
        this.router.navigate(['/']);
      },

      error: () => {
        this.toastService.error('Erro ao criar conta. Verifique os dados.');
        this.isLoading = false;
      },

      complete: () => {
        this.isLoading = false;
      }
    });
  }
}