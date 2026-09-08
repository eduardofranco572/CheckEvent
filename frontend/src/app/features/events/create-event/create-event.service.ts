import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { EventModel, EventInput } from '../../../core/models/event.model';
import {
  CREATE_EVENT_MUTATION,
  UPDATE_EVENT_MUTATION,
  DELETE_EVENT_MUTATION,
  GET_EVENT_BY_ID_QUERY,
} from './graphql/create.operations';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CreateEventService {
  private http = inject(HttpClient);
  private apollo = inject(Apollo);
  private apiUrl = environment.apiUrl;

  getEventById(public_id: string): Observable<EventModel | null> {
    return this.apollo
      .query<{ event: EventModel }>({
        query: GET_EVENT_BY_ID_QUERY,
        variables: { public_id },
        fetchPolicy: 'network-only',
      })
      .pipe(map((res) => res.data?.event || null));
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
    files: {
      banner?: File | null;
      cover?: File | null;
    },
  ): Observable<EventModel> {
    return this.sendMultipartRequest(UPDATE_EVENT_MUTATION, { id, ...eventData }, files).pipe(
      map((res: any) => res.data.updateEvent),
    );
  }

  deleteEvent(id: string): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteEvent: boolean }>({
        mutation: DELETE_EVENT_MUTATION,
        variables: { id },
      })
      .pipe(map((res) => res.data?.deleteEvent || false));
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
}
