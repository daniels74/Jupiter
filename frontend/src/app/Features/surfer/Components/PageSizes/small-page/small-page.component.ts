import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Surfer } from '../../../../../Core/Interfaces/surfer.interface';
import { SurferCryptoComponent } from '../../surfer-crypto/surfer-crypto.component';
import { MatButtonModule } from '@angular/material/button';
import { SurferNftsComponent } from '../../surfer-nfts/surfer-nfts.component';

@Component({
  selector: 'surfer-small-page',
  standalone: true,
  imports: [
    CommonModule,
    SurferCryptoComponent,
    SurferNftsComponent,
    MatButtonModule,
  ],
  templateUrl: './small-page.component.html',
  styleUrls: ['./small-page.component.scss'],
})
export class SmallPageComponent {
  @Input() surfer!: Surfer;
  @Input() noteDisplayState!: boolean;
  @Output() toggleNotes: EventEmitter<any> = new EventEmitter<any>();
  @Input() surferPostStatus!: boolean;
  @Input() surferCryptoStatus!: boolean;
  surferState!: Surfer;

  ngOnInit(): void {
    this.surferState = this.surfer;
  }

  currentMode = 'crypto';

  switchMode(mode: string) {
    if (mode === 'crypto') {
      this.currentMode = 'crypto';
    } else if (mode === 'nfts') {
      this.currentMode = 'nfts';
    } else if (mode === 'notes') {
      this.currentMode = 'notes';
    }
  }
}
