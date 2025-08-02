import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { ProfileService } from './main/services/profile.service';
import { DataMappingService } from './main/services/data-mapping.service';
import { StrapiClientService } from './main/services/strapi-client.service';
import { LoaderService, MatrixEffectService, ScrollRevealService } from './shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ProfileService,
    DataMappingService,
    StrapiClientService,
    LoaderService,
    MatrixEffectService,
    ScrollRevealService
  ]
};
