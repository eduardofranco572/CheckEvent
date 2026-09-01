import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const SIGNUP_MUTATION = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apollo = inject(Apollo);

  login(email: string, password: string): Observable<string> {
    return this.apollo.mutate<{ login: string }>({
      mutation: LOGIN_MUTATION,
      variables: { 
        email, 
        password 
      }

    }).pipe(
      map(result => result.data?.login || '')
    );
  }

  signup(name: string, email: string, password: string): Observable<string> {
    return this.apollo.mutate<{ signup: string }>({
      mutation: SIGNUP_MUTATION,
      variables: { 
        name, 
        email, 
        password 
      }
      
    }).pipe(
      map(result => result.data?.signup || '')
    );
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }
}