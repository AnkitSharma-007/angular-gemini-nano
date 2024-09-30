import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {
  AI_ASSISTANT_TOKEN,
  AI_REWRITER_TOKEN,
  AI_SUMMARIZER_TOKEN,
  AI_WRITER_TOKEN,
} from './constants.ts/ai.constant';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MarkdownPipe } from 'ngx-markdown';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    EditorModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MarkdownPipe,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly aiAssistant = inject(AI_ASSISTANT_TOKEN);
  private readonly aiSummarizerAssistant = inject(AI_SUMMARIZER_TOKEN);
  private readonly aiWriterAssistant = inject(AI_WRITER_TOKEN);
  private readonly aiRewriterAssistant = inject(AI_REWRITER_TOKEN);

  writerTone = 'formal';
  writerLength = 'short';

  reWriterTone = 'as-is';
  reWriterLength = 'as-is';

  isLoading = signal(false);
  isTitleLoading = signal(false);
  blogContent = '';
  blogTitle = signal('');
  outputText = signal('');
  tinyMiceApi = 'h5an1k1veg53uem847zc856ls3w8c446g5a0oom8a3whcvel';
  editorInit = {
    min_height: 500,
    menubar: false,
    plugins: 'lists link image help wordcount',
    toolbar:
      'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
  };

  async generateTitle() {
    this.isTitleLoading.set(true);

    const session = await this.aiAssistant?.create({
      systemPrompt: `Generate the title for the following text. The title should be less than 100 characters and should be engaging and informative.
      Use plain text, without any markdown formatting.
        `,
    });
    if (!session) {
      throw new Error('Failed to create AI assistant session.');
    }
    const result = await session.prompt(this.blogContent);
    this.blogTitle.set(result);
    this.isTitleLoading.set(false);
    session.destroy();
  }

  async analyzeReadingEase() {
    this.isLoading.set(true);

    const session = await this.aiAssistant?.create({
      systemPrompt: `Pretend to be a Language model and analyze the readability of the following text. Use Flesch Reading Ease.
       Provide plain text explanation, without any markdown formatting.
        `,
    });
    if (!session) {
      throw new Error('Failed to create AI assistant session.');
    }
    const result = await session.prompt(this.blogContent);
    this.outputText.set(result);
    this.isLoading.set(false);
    session.destroy();
  }

  async sentimentAnalysis() {
    this.isLoading.set(true);
    const responsePrompt = `
    Please assess the overall sentiment of the following text: ${this.blogContent}. 
    Classify it as 'positive', 'negative', or 'neutral', providing a brief explanation for your reasoning.
    Generate response in a plain English text, without any markdown formatting in less than 100 words."
  `;
    const session = await this.aiAssistant?.create();
    if (!session) {
      throw new Error('Failed to create AI assistant session.');
    }

    const result = await session.prompt(responsePrompt);
    this.outputText.set(result);
    this.isLoading.set(false);
    session.destroy();

    // Prompt the model and stream the result:
    // const stream = await session.promptStreaming(responsePrompt);
    // this.isLoading.set(false);
    // for await (const chunk of stream) {
    //   this.outputText.set(chunk);
    // }
  }

  async getSummary() {
    this.isLoading.set(true);
    const summarizer = await this.aiSummarizerAssistant?.create({
      type: 'teaser',
      format: 'markdown',
      length: 'medium',
    });
    if (!summarizer) {
      throw new Error('Failed to create AI summarizer session.');
    }

    const result = await summarizer.summarize(this.blogContent, {
      context:
        'Generate title in less than 100 characters.Avoid any toxic language and be as constructive as possible.',
    });
    this.outputText.set(result);
    this.isLoading.set(false);
    summarizer.destroy();
  }

  async write() {
    this.isLoading.set(true);
    const writer = await this.aiWriterAssistant?.create({
      tone: this.writerTone,
      format: 'markdown',
      length: this.writerLength,
    });
    if (!writer) {
      throw new Error('Failed to create AI writer session.');
    }
    const result = await writer.write(this.blogContent);
    this.outputText.set(result);
    this.isLoading.set(false);
    writer.destroy();
  }

  async rewrite() {
    this.isLoading.set(true);
    const rewriter = await this.aiRewriterAssistant?.create({
      tone: this.reWriterTone,
      format: 'markdown',
      length: this.reWriterLength,
    });
    if (!rewriter) {
      throw new Error('Failed to create AI rewriter session.');
    }
    const result = await rewriter.rewrite(this.blogContent);
    this.outputText.set(result);
    this.isLoading.set(false);
    rewriter.destroy();
  }
}
