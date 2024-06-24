import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Surfer } from '../../../../../Core/Interfaces/surfer.interface';
import { SurferBasicInfoComponent } from '../../surfer-basic-info/surfer-basic-info.component';
import { SurferCryptoComponent } from '../../surfer-crypto/surfer-crypto.component';

@Component({
  selector: 'surfer-large-page',
  standalone: true,
  imports: [CommonModule, SurferBasicInfoComponent, SurferCryptoComponent],
  templateUrl: './large-page.component.html',
  styleUrl: './large-page.component.scss',
})
export class LargePageComponent {
  @Input() surfer!: Surfer;
  @Input() noteDisplayState!: boolean;
  @Output() toggleNotes: EventEmitter<any> = new EventEmitter<any>();
  @Input() surferPostStatus!: boolean;
  @Input() surferCryptoStatus!: boolean;
  @Input()
  surferState!: Surfer;

  ngOnInit(): void {
    this.surferState = this.surfer;
  }
}
