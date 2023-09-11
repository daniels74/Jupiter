import { Component, Input } from '@angular/core';
import { CoinsEntity } from '../../../../Core/Interfaces/top-trending';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() dataImage!: string;
  @Input() dataName!: string;
  @Input() dataMarketCapRank!: any;
}
