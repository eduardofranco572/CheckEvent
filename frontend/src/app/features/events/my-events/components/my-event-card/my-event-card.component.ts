import { Component, Input } from '@angular/core';
import { DatePipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventModel } from '../../../../../core/models/event.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-my-event-card',
  standalone: true,
  imports: [DatePipe, SlicePipe, RouterLink],
  templateUrl: './my-event-card.component.html',
})
export class MyEventCardComponent {
  @Input({ required: true }) event!: EventModel;
  storageUrl = environment.storageUrl;

  get statusConfig(): { label: string; classes: string } {
    const eventDate = new Date(`${this.event.date}T${this.event.time}`);
    const isPast = eventDate < new Date();

    if (isPast) {
      return {
        label: 'Finalizado',
        classes: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
      };
    }

    return {
      label: 'Confirmado',
      classes: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    };
  }
}
