import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MyEventsService } from './my-events.service';
import { EventModel } from '../../../core/models/event.model';
import { MenuComponent } from '../../../core/layout/menu/menu.component';
import { MyEventCardComponent } from './components/my-event-card/my-event-card.component';
import { MyEventsPromoComponent } from './components/my-events-promo/my-events-promo.component';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [MenuComponent, MyEventCardComponent, MyEventsPromoComponent],
  templateUrl: './my-events.component.html',
})
export class MyEventsComponent implements OnInit {
  private eventService = inject(MyEventsService);
  private cdr = inject(ChangeDetectorRef);

  events: EventModel[] = [];
  page = 1;
  totalEvents = 0;
  hasMore = true;
  isLoading = true;

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    if (!this.hasMore) return;
    this.isLoading = true;

    this.eventService.getMySubscribedEvents(this.page).subscribe({
      next: (response) => {
        if (response?.data) {
          this.events = [...this.events, ...response.data];
          this.hasMore = response.paginatorInfo.hasMorePages;
          this.totalEvents = response.paginatorInfo.total;
          this.page++;
        }

        this.isLoading = false;
        this.cdr.markForCheck();
      },

      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
