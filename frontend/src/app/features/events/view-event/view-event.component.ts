import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { EventModel } from '../../../core/models/event.model';
import { environment } from '../../../../environments/environment';
import { MenuComponent } from '../../../core/layout/menu/menu.component';
import { ToastService } from '../../../shared/services/toast.service';
import { DatePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { EventSubscribeComponent } from './components/event-subscribe/event-subscribe.component';

@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [MenuComponent, DatePipe, LucideAngularModule, EventSubscribeComponent],
  templateUrl: './view-event.component.html',
})
export class ViewEventComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);
  private toastService = inject(ToastService);

  event = signal<EventModel | null>(null);
  storageUrl = environment.storageUrl;
  isLoading = signal(false);

  ngOnInit() {
    const publicId = this.route.snapshot.paramMap.get('id');
    if (!publicId) {
      this.router.navigate(['/404']);
      return;
    }

    this.eventService.getEventById(publicId).subscribe({
      next: (data) => {
        if (!data) {
          this.router.navigate(['/404']);
        } else {
          this.event.set(data);
        }
      },

      error: () => this.router.navigate(['/404']),
    });
  }

  subscribe() {
    const currentEvent = this.event();
    if (!currentEvent || this.isLoading()) return;

    this.isLoading.set(true);

    this.eventService.subscribeToEvent(currentEvent.id).subscribe({
      next: () => {
        this.toastService.success('Inscrição confirmada com sucesso!');
        this.event.update((e) =>
          e
            ? { ...e, is_subscribed: true, subscribers_count: (e.subscribers_count || 0) + 1 }
            : null,
        );

        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.error(err.message || 'Erro ao realizar inscrição.');
        this.isLoading.set(false);
      },
    });
  }
}
