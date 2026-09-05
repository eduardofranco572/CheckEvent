import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventModel } from '../../../../../core/models/event.model';

@Component({
  selector: 'app-event-subscribe',
  standalone: true,
  imports: [],
  templateUrl: './event-subscribe.component.html',
})
export class EventSubscribeComponent {
  @Input({ required: true }) event!: EventModel;
  @Input() isLoading = false;
  @Output() subscribeClick = new EventEmitter<void>();

  get isPassed(): boolean {
    if (!this.event) return false;

    return new Date(`${this.event.date}T${this.event.time}`) < new Date();
  }

  get isSoldOut(): boolean {
    if (!this.event) return false;
    return (this.event.subscribers_count || 0) >= this.event.capacity;
  }

  get isSubscribed(): boolean {
    if (!this.event) return false;
    return !!this.event.is_subscribed;
  }

  get isFree(): boolean {
    if (!this.event) return false;

    return !this.event.price || this.event.price === '0' || this.event.price === '0.00';
  }

  get progressPercentage(): number {
    if (!this.event || !this.event.capacity) return 0;

    return Math.min(((this.event.subscribers_count || 0) / this.event.capacity) * 100, 100);
  }
}
