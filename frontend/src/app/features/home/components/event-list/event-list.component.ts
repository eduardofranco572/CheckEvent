import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HomeService } from '../../home.service';
import { EventModel } from '../../../../core/models/event.model';
import { EventCardComponent } from '../../../../shared/components/event-card/event-card.component';
import { EventFilterComponent } from '../event-filter/event-filter.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventCardComponent, EventFilterComponent],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit, OnDestroy {
  private homeService = inject(HomeService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);

  private observer: IntersectionObserver | null = null;
  private anchorElement: HTMLElement | null = null;

  @ViewChild('scrollAnchor') set setupObserver(element: ElementRef | undefined) {
    if (element && isPlatformBrowser(this.platformId)) {
      this.anchorElement = element.nativeElement;

      if (this.observer) this.observer.disconnect();

      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this.loading && this.hasMore) {
            this.zone.run(() => this.loadEvents());
          }
        },
        { rootMargin: '250px' },
      );

      this.observer.observe(this.anchorElement!);
    }
  }

  events: EventModel[] = [];
  page = 1;
  hasMore = true;
  loading = true;
  skeletonItems = [1, 2, 3];

  currentFilters = {
    name: '',
    city: '',
    price: '',
    date: '',
  };

  ngOnInit() {
    this.loadEvents();
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
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
    this.cdr.markForCheck();

    this.homeService.getUpcomingEvents(this.page, this.currentFilters).subscribe({
      next: (response) => {
        if (response?.data) {
          const newEvents = response.data.filter(
            (incomingEvent) =>
              !this.events.some((existingEvent) => existingEvent.id === incomingEvent.id),
          );

          this.events = [...this.events, ...newEvents];
          this.hasMore = response.paginatorInfo.hasMorePages;

          if (this.hasMore) {
            this.page++;
          }
        }

        this.loading = false;
        this.cdr.markForCheck();

        if (
          this.hasMore &&
          isPlatformBrowser(this.platformId) &&
          this.observer &&
          this.anchorElement
        ) {
          setTimeout(() => {
            this.observer!.unobserve(this.anchorElement!);
            this.observer!.observe(this.anchorElement!);
          }, 150);
        }
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
