import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import {
  CryptoCoinObj,
  NFT,
} from '../../../../../Core/Interfaces/top-trending';

@Component({
  selector: 'app-home-small',
  templateUrl: './home-small.component.html',
  styleUrls: ['./home-small.component.css'],
})
export class HomeSmallComponent {
  @Output() toggleContentStateEvent = new EventEmitter();

  @Input() crypto$!: Observable<Array<CryptoCoinObj>>;

  @Input() nfts$!: Observable<Array<NFT>>;

  @Input() trendingContent_state = false;

  @Input() selectedContent = 'Crypto';

  @Input() cryptoCollection!: any[];

  @Input() nftCollection!: any[];

  constructor(public spinner: NgxSpinnerService) {}

  toggleContentState() {
    this.toggleContentStateEvent.emit();
  }
}
