import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { Surfer } from '../../../../Core/Interfaces/surfer.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'surfer-basic-info',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './surfer-basic-info.component.html',
  styleUrl: './surfer-basic-info.component.css'
})
export class SurferBasicInfoComponent {

  @Input() surfer!: Surfer;
  @Output() toggleNotes: EventEmitter<any> = new EventEmitter<any>();

}
