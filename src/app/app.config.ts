import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { ProfileService } from './main/services/profile.service';
import { LoaderService } from './main/services/loader.service';
import { MatrixEffectService } from './main/services/matrix-effect.service';
import { ScrollRevealService } from './main/services/scroll-reveal.service';
import { DataMappingService } from './main/services/data-mapping.service';
import { StrapiClientService } from './main/services/strapi-client.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ProfileService,
    LoaderService,
    MatrixEffectService,
    ScrollRevealService,
    DataMappingService,
    StrapiClientService
  ]
};
