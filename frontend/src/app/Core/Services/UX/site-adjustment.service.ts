import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Theme = {
  palette: 'theme-light' | 'theme-dark';
  cover: 'light-cover' | 'dark-cover';
};
@Injectable({
  providedIn: 'root',
})
// ? True = Light MODE
// ? False = Dark MODE
export class SiteAdjustmentService {
  private myValueSource = new BehaviorSubject<boolean>(true);
  myValue$ = this.myValueSource.asObservable();
  private renderer: Renderer2;

  private currentTheme: Theme = {
    palette: 'theme-light',
    cover: 'light-cover',
  };

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') as
      | 'theme-light light-cover'
      | 'theme-dark dark-cover';
    if (savedTheme) {
      try {
        this.currentTheme = JSON.parse(savedTheme) as Theme;
      } catch {
        // fallback to default if parsing fails
      }
    }
    this.applyTheme(this.currentTheme);
  }

  toggleTheme() {
    this.currentTheme =
      this.currentTheme.palette === 'theme-light'
        ? { palette: 'theme-dark', cover: 'dark-cover' }
        : { palette: 'theme-light', cover: 'light-cover' };

    localStorage.setItem('theme', JSON.stringify(this.currentTheme));
    this.applyTheme(this.currentTheme);
  }

  private applyTheme(theme: Theme) {
    // Remove all related classes first
    ['light-cover', 'dark-cover', 'theme-light', 'theme-dark'].forEach((cls) =>
      this.renderer.removeClass(this.document.body, cls),
    );

    // Add current theme classes
    this.renderer.addClass(this.document.body, theme.palette);
    this.renderer.addClass(this.document.body, theme.cover);
  }

  updateValue(newValue: boolean) {
    this.myValueSource.next(newValue);
  }
}
