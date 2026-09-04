import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { EventModel, EventInput, PaginatedEventResponse } from '../../core/models/event.model';
import {
  GET_UPCOMING_EVENTS_QUERY,
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

  getLatestEvent(): Observable<EventModel | null> {
    return this.apollo
      .query<any>({
        query: GET_UPCOMING_EVENTS_QUERY,
        variables: { first: 1, page: 1 },
        fetchPolicy: 'network-only',
      })
      .pipe(map((res) => res.data?.upcomingEvents?.data[0] || null));
  }

  getEventById(id: string): Observable<EventModel | null> {
    return this.apollo
      .query<{ event: EventModel }>({
        query: GET_EVENT_BY_ID_QUERY,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .pipe(map((res) => res.data?.event || null));
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
          first: 6,
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
              paginatorInfo: { hasMorePages: false, currentPage: page, lastPage: page },
            },
        ),
      );
  }

  createEvent(
    eventData: EventInput,
    files: { banner?: File | null; cover?: File | null },
  ): Observable<EventModel> {
    return this.sendMultipartRequest(CREATE_EVENT_MUTATION, { ...eventData }, files).pipe(
      map((res: any) => res.data.createEvent),
    );
  }

  updateEvent(
    id: string,
    eventData: EventInput,
    files: { banner?: File | null; cover?: File | null },
  ): Observable<EventModel> {
    return this.sendMultipartRequest(UPDATE_EVENT_MUTATION, { id, ...eventData }, files).pipe(
      map((res: any) => res.data.updateEvent),
    );
  }

  private sendMultipartRequest(
    query: string,
    variables: any,
    files: {
      banner?: File | null;
      cover?: File | null;
    },
  ): Observable<any> {
    if (variables.capacity) {
      variables.capacity =
        typeof variables.capacity === 'string'
          ? parseInt(variables.capacity, 10)
          : variables.capacity;
    }

    const formData = new FormData();
    const mapObj: any = {};
    let fileIndex = 0;

    if (files.banner) {
      variables.banner = null;

      mapObj[fileIndex] = ['variables.banner'];
      formData.append(fileIndex.toString(), files.banner, files.banner.name);

      fileIndex++;
    }

    if (files.cover) {
      variables.cover = null;

      mapObj[fileIndex] = ['variables.cover'];
      formData.append(fileIndex.toString(), files.cover, files.cover.name);

      fileIndex++;
    }

    formData.append('operations', JSON.stringify({ query, variables }));
    formData.append('map', JSON.stringify(mapObj));

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
