import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(), provideFirebaseApp(() => initializeApp({"projectId":"estudo-flutter-a8da9","appId":"1:767847960731:web:175c3d2b1f43496a68363e","databaseURL":"https://estudo-flutter-a8da9-default-rtdb.firebaseio.com","storageBucket":"estudo-flutter-a8da9.firebasestorage.app","apiKey":"AIzaSyBqu1Nx2qrKQVbA5R1kuq35OYDR5ZJHn-s","authDomain":"estudo-flutter-a8da9.firebaseapp.com","messagingSenderId":"767847960731","measurementId":"G-HC9KV07THW"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())
  ],
};
