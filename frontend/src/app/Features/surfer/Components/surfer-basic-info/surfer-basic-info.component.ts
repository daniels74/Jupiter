import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { Surfer } from '../../../../Core/Interfaces/surfer.interface';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../Core/Services/auth.service';

@Component({
  selector: 'surfer-basic-info',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './surfer-basic-info.component.html',
  styleUrls: ['./surfer-basic-info.component.css'],
})
export class SurferBasicInfoComponent {
  @Input() surfer!: Surfer;
  @Output() toggleNotes: EventEmitter<any> = new EventEmitter<any>();
  authState = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState$.subscribe((res) => {
      this.authState = res;
    });
  }
}
