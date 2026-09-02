import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map, filter, EMPTY } from 'rxjs';
import { User } from '../models/user.model';

const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
      is_pro
      is_adm
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class UserService {
  private apollo = inject(Apollo);
  private platformId = inject(PLATFORM_ID);

  getMe(): Observable<User | null> {
    if (!isPlatformBrowser(this.platformId)) return EMPTY;

    return this.apollo
      .watchQuery<{ me: User }>({
        query: GET_ME,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        filter((result) => !result.loading),
        map((result) => (result.data?.me as User) || null),
      );
  }

  fetchMe(): Observable<User | null> {
    if (!isPlatformBrowser(this.platformId)) return EMPTY;

    return this.apollo
      .query<{ me: User }>({
        query: GET_ME,
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => (result.data?.me as User) || null));
  }
}
