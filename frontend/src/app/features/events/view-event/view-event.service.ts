import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { EventModel } from '../../../core/models/event.model';
import { GET_EVENT_BY_ID_QUERY, SUBSCRIBE_EVENT_MUTATION } from './graphql/view.operations';

@Injectable({ providedIn: 'root' })
export class ViewEventService {
  private apollo = inject(Apollo);

  getEventById(public_id: string): Observable<EventModel | null> {
    return this.apollo
      .query<{ event: EventModel }>({
        query: GET_EVENT_BY_ID_QUERY,
        variables: { public_id },
        fetchPolicy: 'network-only',
      })
      .pipe(map((res) => res.data?.event || null));
  }

  subscribeToEvent(eventId: string): Observable<boolean> {
    return this.apollo
      .mutate<{ subscribeToEvent: boolean }>({
        mutation: SUBSCRIBE_EVENT_MUTATION,
        variables: { eventId },
      })
      .pipe(map((res) => res.data?.subscribeToEvent || false));
  }
}
