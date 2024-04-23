import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SurferService } from '../../Core/Services/surfer.service';

@Injectable({
  providedIn: 'root',
})
export class retrieveSurferData {
  constructor(private surferService: SurferService) {}

  getData() {
    this.surferService.surfer$.subscribe((surfer) => {
      return surfer.cryptos;
    });
  }
}

export const surferResolver: ResolveFn<any> = (route, state) => {
  return inject(retrieveSurferData).getData();
};
