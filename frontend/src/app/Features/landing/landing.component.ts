import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  title_container_width = window.innerWidth <= 700 ? '60%' : '50%';
  title_container_height = '35%';
  crpyoinfo_container_width = window.innerWidth <= 700 ? '90%' : '70%';
  crpyoinfo_container_height = window.innerWidth <= 700 ? '40%' : '50%';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    //this.width = (event.target as Window).innerWidth;
    if ((event.target as Window).innerWidth <= 699) {
      this.title_container_width = '60%';
      this.title_container_height = '40%';
      this.crpyoinfo_container_width = '90%';
      this.crpyoinfo_container_height = '50%';
    } else if ((event.target as Window).innerWidth > 700) {
      this.title_container_width = '50%';
      this.title_container_height = '40%';
      this.crpyoinfo_container_width = '90%';
      this.crpyoinfo_container_height = '50%';
    }
    // this.height = (event.target as Window).innerHeight;
  }
}
