import { Component, HostListener, OnInit } from '@angular/core';
import { SurferService } from '../../Core/Services/surfer.service';
import { ActivatedRoute } from '@angular/router';
import { Surfer } from '../../Core/Interfaces/surfer.interface';
import { LargePageComponent } from './Components/PageSizes/large-page/large-page.component';

@Component({
  selector: 'app-surfer',
  templateUrl: './surfer.component.html',
  styleUrls: ['./surfer.component.scss'],
})
export class SurferComponent implements OnInit {
  surfer!: Surfer;
  id = this.route.snapshot.paramMap.get('id');
  noteDisplayState = false;
  surferCryptoStatus = false;
  surferPostStatus = false;
  pageSize = window.innerWidth <= 700 ? false : true;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if ((event.target as Window).innerWidth <= 699) {
      this.pageSize = false;
    } else if ((event.target as Window).innerWidth > 700) {
      this.pageSize = true;
    }
  }

  constructor(
    private surferService: SurferService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.surferService.surfer$.subscribe((surfer) => {
      this.surfer = surfer;
      if (this.surfer.cryptos) {
        if (this.surfer.cryptos.length > 0) {
          this.surferCryptoStatus = true;
        } else {
          this.surferCryptoStatus = false;
        }
      }
      if (surfer.posts) {
        if (surfer.posts.length > 0) {
          this.surferPostStatus = true;
        } else {
          this.surferPostStatus = false;
        }
      }
    });
  }

  toggleNotes() {
    this.surferCryptoStatus = !this.surferCryptoStatus;
    this.noteDisplayState = !this.noteDisplayState;
  }
}
