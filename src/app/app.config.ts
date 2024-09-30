import {
  ApplicationConfig,
  provideZoneChangeDetection,
  SecurityContext,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAIAssistant } from './providers/ai-assistant.provider';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAIAssistant(),
    provideAnimationsAsync(),
    provideMarkdown({ sanitize: SecurityContext.NONE }),
  ],
};
