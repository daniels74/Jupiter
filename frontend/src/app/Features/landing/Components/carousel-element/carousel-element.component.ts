import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-element',
  templateUrl: './carousel-element.component.html',
  styleUrls: ['./carousel-element.component.css'],
})
export class CarouselElementComponent {
  @Input() Item!: any;
  @Input() name: any;

  cryptoname!: any;

  constructor() {
    this.cryptoname = this.name;
  }
}
