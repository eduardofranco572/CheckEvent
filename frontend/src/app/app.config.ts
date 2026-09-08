import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  inject,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { LucideAngularModule, Eye, EyeOff, MapPin, Users, Pencil } from 'lucide-angular';
import { environment } from '../environments/environment';
import { FlatpickrModule } from 'angularx-flatpickr';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    importProvidersFrom(
      LucideAngularModule.pick({
        Eye,
        EyeOff,
        MapPin,
        Users,
        Pencil,
      }),
      FlatpickrModule.forRoot(),
    ),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const authLink = setContext((operation, context) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        if (!token) return {};
        return { headers: { Authorization: `Bearer ${token}` } };
      });

      return {
        link: ApolloLink.from([authLink, httpLink.create({ uri: environment.apiUrl })]),
        cache: new InMemoryCache(),
      };
    }),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
};
