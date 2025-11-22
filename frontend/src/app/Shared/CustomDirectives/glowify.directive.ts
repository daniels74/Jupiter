import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGlowify]',
})
export class GlowifyDirective {
  chosenColor = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'box-shadow 0.4s ease, transform 0.4s ease',
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.chosenColor = this.getMaterialColor();
    console.log('Chosen Color:', this.chosenColor);
    this.glow(this.chosenColor, `0px 0px 12px 7px ${this.chosenColor}`);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.glow('', '');
  }

  private getMaterialColor(): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--glow-accent')
      .trim();
  }

  glow(color: string, glow: string) {
    this.el.nativeElement.style.borderColor = color;

    this.el.nativeElement.style.boxShadow = glow;
  }
}
