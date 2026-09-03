import { Component, Input } from '@angular/core';
import { DatePipe, SlicePipe } from '@angular/common';
import { EventModel } from '../../../../core/models/event.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-featured-event',
  standalone: true,
  imports: [DatePipe, SlicePipe],
  templateUrl: './featured-event.component.html',
})
export class FeaturedEventComponent {
  @Input({ required: true }) event!: EventModel;
  storageUrl = environment.storageUrl;
}
