import { isPlatformBrowser } from '@angular/common';
import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  PLATFORM_ID,
} from '@angular/core';
import {
  AI_ASSISTANT_TOKEN,
  AI_REWRITER_TOKEN,
  AI_SUMMARIZER_TOKEN,
  AI_WRITER_TOKEN,
} from '../constants.ts/ai.constant';

export function provideAIAssistant(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: AI_ASSISTANT_TOKEN,
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        const objWindow = isPlatformBrowser(platformId) ? window : undefined;
        if (objWindow) {
          const winWithAI = objWindow as any;
          if (winWithAI?.ai?.assistant) {
            return winWithAI.ai.assistant;
          }
        }
        return undefined;
      },
    },
    {
      provide: AI_SUMMARIZER_TOKEN,
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        const objWindow = isPlatformBrowser(platformId) ? window : undefined;
        if (objWindow) {
          const winWithAI = objWindow as any;
          if (winWithAI?.ai?.summarizer) {
            return winWithAI.ai.summarizer;
          }
        }
        return undefined;
      },
    },
    {
      provide: AI_WRITER_TOKEN,
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        const objWindow = isPlatformBrowser(platformId) ? window : undefined;
        if (objWindow) {
          const winWithAI = objWindow as any;
          if (winWithAI?.ai?.writer) {
            return winWithAI.ai.writer;
          }
        }
        return undefined;
      },
    },
    {
      provide: AI_REWRITER_TOKEN,
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        const objWindow = isPlatformBrowser(platformId) ? window : undefined;
        if (objWindow) {
          const winWithAI = objWindow as any;
          if (winWithAI?.ai?.rewriter) {
            return winWithAI.ai.rewriter;
          }
        }
        return undefined;
      },
    },
  ]);
}
