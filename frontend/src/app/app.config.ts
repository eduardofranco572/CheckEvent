import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    importProvidersFrom(
      LucideAngularModule.pick({ Eye, EyeOff })
    ),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return { 
        link: httpLink.create({
          uri: 'http://127.0.0.1:8000/graphql',
        }),
        cache: new InMemoryCache(),
      };
    }), 
  ],
};