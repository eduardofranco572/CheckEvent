import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#1C122C', 
    color: '#ffffff',
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  success(message: string): void {
    this.toast.fire({
      icon: 'success',
      title: message,
      iconColor: '#7702FF' 
    });
  }

  error(message: string): void {
    this.toast.fire({
      icon: 'error',
      title: message,
      iconColor: '#FF41F8' 
    });
  }
}