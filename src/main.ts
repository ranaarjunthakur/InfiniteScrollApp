import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import {  PreloadAllModules,  withPreloading, } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { IonicModule } from '@ionic/angular';



bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withComponentInputBinding(),withPreloading(PreloadAllModules)),
    provideHttpClient(), provideAnimationsAsync(),
    // importProvidersFrom(IonicModule.forRoot({})),
    importProvidersFrom(HttpClientModule),
  ],
});