import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MenuComponent } from '../../core/layout/menu/menu.component';
import { HomeService } from './home.service';
import { EventModel } from '../../core/models/event.model';
import { FeaturedEventComponent } from './components/featured-event/featured-event.component';
import { EventListComponent } from './components/event-list/event-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, FeaturedEventComponent, EventListComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private homeService = inject(HomeService);
  private cdr = inject(ChangeDetectorRef);

  featuredEvent: EventModel | null = null;
  currentDate = '';

  ngOnInit() {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

    this.currentDate = formatter.format(new Date());

    this.homeService.getLatestEvent().subscribe((event) => {
      setTimeout(() => {
        this.featuredEvent = event;
        this.cdr.markForCheck();
      });
    });
  }
}
