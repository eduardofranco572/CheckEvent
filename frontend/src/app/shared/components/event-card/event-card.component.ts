import { Component, Input } from '@angular/core';
import { DatePipe, SlicePipe, NgIf } from '@angular/common';
import { EventModel } from '../../../core/models/event.model';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [DatePipe, SlicePipe, NgIf, RouterLink],
  templateUrl: './event-card.component.html',
})
export class EventCardComponent {
  @Input({ required: true }) event!: EventModel;
  storageUrl = environment.storageUrl;
}
