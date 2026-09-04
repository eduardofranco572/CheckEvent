import { Component, OnInit, inject, HostListener, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../../../events/event.service';
import { EventModel } from '../../../../core/models/event.model';
import { EventCardComponent } from '../../../../shared/components/event-card/event-card.component';
import { EventFilterComponent } from '../event-filter/event-filter.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventCardComponent, EventFilterComponent],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  private eventService = inject(EventService);
  private cdr = inject(ChangeDetectorRef);

  events: EventModel[] = [];
  page = 1;
  hasMore = true;
  loading = true;

  currentFilters = {
    name: '',
    city: '',
    price: '',
    date: '',
  };

  ngOnInit() {
    Promise.resolve().then(() => this.loadEvents());
  }

  onFilterChanged(filters: { name: string; city: string; price: string; date: string }) {
    this.currentFilters = filters;
    this.page = 1;
    this.events = [];
    this.hasMore = true;
    this.loadEvents();
  }

  loadEvents() {
    if (!this.hasMore) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.eventService.getUpcomingEvents(this.page, this.currentFilters).subscribe({
      next: (response) => {
        if (response?.data) {
          const newEvents = response.data.filter(
            (incomingEvent) =>
              !this.events.some((existingEvent) => existingEvent.id === incomingEvent.id),
          );

          this.events = [...this.events, ...newEvents];
          this.hasMore = response.paginatorInfo.hasMorePages;
          this.page++;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.loading) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      this.loadEvents();
    }
  }
}
