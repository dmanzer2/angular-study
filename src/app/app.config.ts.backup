import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { userReducer } from './store/user.reducer';
import * as UserEffects from './store/user.effects';
import { UserService } from './shared/services/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    // provideClientHydration(withEventReplay()), // Temporarily disabled for debugging
    provideHttpClient(withFetch()),
    UserService,
    provideStore({ users: userReducer }),
    provideEffects(UserEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      connectInZone: true
    })
  ]
};
