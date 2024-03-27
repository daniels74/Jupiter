import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserSearchService } from '../../../../Core/Services/UserSearch/user-search.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-usersearch',
  templateUrl: './usersearch.component.html',
  styleUrls: ['./usersearch.component.css'],
})
export class UsersearchComponent {
  constructor(
    private fb: FormBuilder,
    private userSearchService: UserSearchService,
  ) {}

  @ViewChild('userSearch') userSearch!: ElementRef;

  results: any[] = [];
  searchIsActive = false;

  // Screen Size
  displayAlign = window.innerWidth < 700 ? 'center' : 'flex-start';
  isBigScreen = window.innerWidth < 700 ? false : true;

  ngAfterViewInit() {
    fromEvent(this.userSearch.nativeElement, 'keyup')
      .pipe(debounceTime(500))
      .pipe(
        switchMap((res: any) => {
          if (!res.target.value) {
            this.searchIsActive = false;
          } else {
            this.searchIsActive = true;
          }
          return this.userSearchService.getUsers(res.target.value);
        }),
      )
      .subscribe((users) => {
        console.log('Users', users);
        this.results = users.items;
      });
  }

  closeSearch() {
    this.searchIsActive = false;
  }
}
