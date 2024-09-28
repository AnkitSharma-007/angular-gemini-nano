import { InjectionToken } from '@angular/core';

export const AI_ASSISTANT_TOKEN = new InjectionToken<
  { create: Function; capabilities: Function } | undefined
>('AI_ASSISTANT_TOKEN');

export const AI_SUMMARIZER_TOKEN = new InjectionToken<
  { create: Function; capabilities: Function } | undefined
>('AI_SUMMARIZER_TOKEN');

export const AI_WRITER_TOKEN = new InjectionToken<
  { create: Function; capabilities: Function } | undefined
>('AI_WRITER_TOKEN');

export const AI_REWRITER_TOKEN = new InjectionToken<
  { create: Function; capabilities: Function } | undefined
>('AI_REWRITER_TOKEN');
