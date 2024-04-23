import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurferService } from '../../Core/Services/surfer.service';
import { ActivatedRoute } from '@angular/router';
import { Surfer } from '../../Core/Interfaces/surfer.interface';

@Component({
  selector: 'app-surfer',
  templateUrl: './surfer.component.html',
  styleUrls: ['./surfer.component.scss'],
})
export class SurferComponent implements OnInit {
  surfer!: Surfer;
  id = this.route.snapshot.paramMap.get('id');
  noteDisplayState = false;

  // d = this.route.snapshot.data['crypto'];

  constructor(
    private surferService: SurferService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // this.surferService.getSurferData(this.id).subscribe((surfer) => {
    //   console.log('surfer: ', surfer);
    //   this.surfer = surfer;
    // });
    this.surferService.surfer$.subscribe((surfer) => (this.surfer = surfer));
  }

  toggleNotes() {
    this.noteDisplayState = !this.noteDisplayState;
  }
}
