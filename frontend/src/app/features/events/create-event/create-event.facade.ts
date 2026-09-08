import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEventService } from './create-event.service';
import { UserService } from '../../../core/services/user.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Observable, tap } from 'rxjs';
import { EventModel } from '../../../core/models/event.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CreateEventFacade {
  private fb = inject(FormBuilder);
  private eventService = inject(CreateEventService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  isEditMode = false;
  eventId: string | null = null;
  bannerPreview: string | ArrayBuffer | null = null;
  coverPreview: string | ArrayBuffer | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    capacity: [null as any, [Validators.required, Validators.min(1)]],
    street: ['', Validators.required],
    city: ['', Validators.required],
    price: [''],
    description: [''],
    bannerFile: [null as File | null],
    coverFile: [null as File | null],
  });

  constructor() {
    this.form.get('price')?.valueChanges.subscribe((val) => {
      if (val === null || val === undefined) return;

      const stringVal = val.toString();
      const apenasNumeros = stringVal.replace(/\D/g, '');

      if (!apenasNumeros) {
        if (stringVal !== '') {
          this.form.get('price')?.setValue('', { emitEvent: false });
        }
        return;
      }

      const valorFormatado = (parseInt(apenasNumeros, 10) / 100).toFixed(2);
      const moeda = 'R$ ' + valorFormatado.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      if (stringVal !== moeda) {
        this.form.get('price')?.setValue(moeda, { emitEvent: false });
      }
    });
  }

  loadEventData(publicId: string): Observable<EventModel | null> {
    this.isEditMode = true;

    return this.eventService.getEventById(publicId).pipe(
      tap((event) => {
        if (!event) {
          this.router.navigate(['/404']);
          return;
        }

        this.eventId = event.id;

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
            street: event.street,
            city: event.city,
            price: event.price,
            description: event.description,
          });

          if (event.banner) {
            this.bannerPreview = `${environment.storageUrl}/uploads/eventos/${event.id}/img/${event.banner}`;
          }

          if (event.cover) {
            this.coverPreview = `${environment.storageUrl}/uploads/eventos/${event.id}/img/${event.cover}`;
          }
        });
      }),
    );
  }

  submit() {
    if (this.form.invalid) return;

    const formValues = { ...this.form.value } as any;

    if (formValues.price) {
      const apenasNumeros = formValues.price.replace(/\D/g, '');
      formValues.price = (parseInt(apenasNumeros, 10) / 100).toFixed(2);
    }

    const files = {
      banner: formValues.bannerFile as File | null,
      cover: formValues.coverFile as File | null,
    };

    const request$ = this.isEditMode
      ? this.eventService.updateEvent(this.eventId!, formValues, files)
      : this.eventService.createEvent(formValues, files);

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

      error: () => {
        this.toastService.error('Erro no servidor.');
      },
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
        error: () => {
          this.toastService.error('Erro no servidor ao excluir.');
        },
      });
    }
  }
}
