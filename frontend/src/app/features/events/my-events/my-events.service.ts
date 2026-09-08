import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { PaginatedEventResponse } from '../../../core/models/event.model';
import { GET_MY_SUBSCRIBED_EVENTS_QUERY } from './graphql/my-events.operations';

@Injectable({ providedIn: 'root' })
export class MyEventsService {
  private apollo = inject(Apollo);

  getMySubscribedEvents(page: number): Observable<PaginatedEventResponse> {
    return this.apollo
      .query<{ mySubscribedEvents: PaginatedEventResponse }>({
        query: GET_MY_SUBSCRIBED_EVENTS_QUERY,
        variables: {
          first: 10,
          page,
        },
        fetchPolicy: 'network-only',
      })

      .pipe(
        map(
          (res) =>
            res.data?.mySubscribedEvents || {
              data: [],
              paginatorInfo: { hasMorePages: false, currentPage: page, lastPage: page, total: 0 },
            },
        ),
      );
  }
}
