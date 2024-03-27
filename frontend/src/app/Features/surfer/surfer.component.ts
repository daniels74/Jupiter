import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurferService } from '../../Core/Services/surfer.service';
import { ActivatedRoute } from '@angular/router';
import { Surfer } from '../../Core/Interfaces/surfer.interface';

@Component({
  selector: 'app-surfer',
  templateUrl: './surfer.component.html',
  styleUrl: './surfer.component.css',
})
export class SurferComponent implements OnInit {
  surfer!: Surfer;
  id = this.route.snapshot.paramMap.get('id');
  noteDisplayState = false;

  constructor(
    private surferService: SurferService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.surferService.getSurferData(this.id).subscribe((surfer) => {
      console.log('surfer: ', surfer);
      this.surfer = surfer;
    });
    this.surferService.surfer$.subscribe((surfer) => (this.surfer = surfer));
  }

  toggleNotes() {
    this.noteDisplayState = !this.noteDisplayState;
  }
}
