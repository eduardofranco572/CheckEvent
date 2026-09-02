import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { EventModel, EventInput } from '../../core/models/event.model';
import {
  GET_EVENT_BY_ID_QUERY,
  CREATE_EVENT_MUTATION,
  UPDATE_EVENT_MUTATION,
  DELETE_EVENT_MUTATION,
} from './graphql/event.operations';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);
  private apollo = inject(Apollo);
  private apiUrl = environment.apiUrl;

  getEventById(id: string): Observable<EventModel | null> {
    return this.apollo
      .query<{ event: EventModel }>({
        query: GET_EVENT_BY_ID_QUERY,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .pipe(map((res) => res.data?.event || null));
  }

  createEvent(eventData: EventInput, bannerFile: File | null): Observable<EventModel> {
    return this.sendMultipartRequest(CREATE_EVENT_MUTATION, { ...eventData }, bannerFile).pipe(
      map((res: any) => res.data.createEvent),
    );
  }

  updateEvent(id: string, eventData: EventInput, bannerFile: File | null): Observable<EventModel> {
    return this.sendMultipartRequest(UPDATE_EVENT_MUTATION, { id, ...eventData }, bannerFile).pipe(
      map((res: any) => res.data.updateEvent),
    );
  }

  // Abstrair o código repetitivo do FormData
  private sendMultipartRequest(query: string, variables: any, file: File | null): Observable<any> {
    if (variables.capacity) {
      variables.capacity =
        typeof variables.capacity === 'string'
          ? parseInt(variables.capacity, 10)
          : variables.capacity;
    }

    variables.banner = null;

    const formData = new FormData();
    formData.append('operations', JSON.stringify({ query, variables }));
    formData.append('map', JSON.stringify({ '0': ['variables.banner'] }));

    if (file) {
      formData.append('0', file, file.name);
    }

    return this.http.post(this.apiUrl, formData);
  }

  deleteEvent(id: string): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteEvent: boolean }>({
        mutation: DELETE_EVENT_MUTATION,
        variables: { id },
      })
      .pipe(map((res) => res.data?.deleteEvent || false));
  }
}
