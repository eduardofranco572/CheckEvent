import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { UserService } from '../../../core/services/user.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Observable, tap } from 'rxjs';
import { EventModel } from '../../../core/models/event.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CreateEventFacade {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  isEditMode = false;
  eventId: string | null = null;
  bannerPreview: string | ArrayBuffer | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    capacity: [null as any, [Validators.required, Validators.min(1)]],
    location: ['', Validators.required],
    price: [''],
    description: [''],
    bannerFile: [null as File | null],
  });

  loadEventData(id: string): Observable<EventModel | null> {
    this.eventId = id;
    this.isEditMode = true;

    return this.eventService.getEventById(id).pipe(
      tap((event) => {
        if (!event) {
          this.router.navigate(['/404']);
          return;
        }

        this.userService.fetchMe().subscribe((user) => {
          if (!user || String(event.user?.id) !== String(user.id)) {
            this.router.navigate(['/404']);
            return;
          }

          this.form.patchValue({
            name: event.name,
            date: event.date,
            time: event.time ? event.time.substring(0, 5) : '',
            capacity: event.capacity,
            location: event.location,
            price: event.price,
            description: event.description,
          });

          if (event.banner) {
            this.bannerPreview = `${environment.storageUrl}/uploads/eventos/${event.id}/img/${event.banner}`;
          }
        });
      }),
    );
  }

  submit() {
    if (this.form.invalid) return;

    const formValues = this.form.value as any;
    const bannerFile = formValues.bannerFile as File | null;

    const request$ = this.isEditMode
      ? this.eventService.updateEvent(this.eventId!, formValues, bannerFile)
      : this.eventService.createEvent(formValues, bannerFile);

    request$.subscribe({
      next: (response: any) => {
        if (response?.errors) {
          this.toastService.error(`Erro ao ${this.isEditMode ? 'editar' : 'criar'} evento.`);
          return;
        }

        this.toastService.success(
          `Evento ${this.isEditMode ? 'atualizado' : 'criado'} com sucesso!`,
        );
        this.router.navigate(['/']);
      },
      error: () => this.toastService.error('Erro no servidor.'),
    });
  }

  deleteEvent() {
    if (!this.eventId) return;

    if (confirm('Tem certeza que deseja excluir este evento? Essa ação não pode ser desfeita.')) {
      this.eventService.deleteEvent(this.eventId).subscribe({
        next: (success) => {
          if (success) {
            this.toastService.success('Evento excluído com sucesso!');
            this.router.navigate(['/']);
          } else {
            this.toastService.error('Erro ao excluir evento.');
          }
        },
        error: () => this.toastService.error('Erro no servidor ao excluir.'),
      });
    }
  }
}
