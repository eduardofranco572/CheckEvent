import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { EventModel, PaginatedEventResponse } from '../../core/models/event.model';
import { GET_UPCOMING_EVENTS_QUERY } from './graphql/home.operations';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private apollo = inject(Apollo);

  getLatestEvent(): Observable<EventModel | null> {
    return this.apollo
      .query<any>({
        query: GET_UPCOMING_EVENTS_QUERY,
        variables: { first: 1, page: 1 },
        fetchPolicy: 'network-only',
      })
      .pipe(map((res) => res.data?.upcomingEvents?.data[0] || null));
  }

  getUpcomingEvents(
    page: number,
    filters: {
      name?: string;
      city?: string;
      price?: string;
      date?: string;
    },
  ): Observable<PaginatedEventResponse> {
    return this.apollo
      .query<{ upcomingEvents: PaginatedEventResponse }>({
        query: GET_UPCOMING_EVENTS_QUERY,
        variables: {
          first: 3,
          page,
          name: filters.name,
          city: filters.city,
          price: filters.price,
          dateFilter: filters.date,
        },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map(
          (res) =>
            res.data?.upcomingEvents || {
              data: [],
              paginatorInfo: { hasMorePages: false, currentPage: page, lastPage: page, total: 0 },
            },
        ),
      );
  }
}
