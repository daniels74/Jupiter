import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// ? True = Light MODE
// ? False = Dark MODE
export class SiteAdjustmentService {
  private myValueSource = new BehaviorSubject<boolean>(true);
  myValue$ = this.myValueSource.asObservable();

  updateValue(newValue: boolean) {
    this.myValueSource.next(newValue);
  }
}
