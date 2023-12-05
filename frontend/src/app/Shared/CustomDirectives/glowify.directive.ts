import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGlowify]',
})
export class GlowifyDirective {
  constructor(private el: ElementRef) {}

  chosenColor = 'blue';

  @HostListener('mouseenter') onMouseEnter() {
    this.glow(this.chosenColor, '0px 0px 30px 5px #6600FF');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.glow('', '');
  }

  glow(color: string, glow: string) {
    this.el.nativeElement.style.borderColor = color;

    this.el.nativeElement.style.boxShadow = glow;
  }
}
