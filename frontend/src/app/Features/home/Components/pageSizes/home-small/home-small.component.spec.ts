import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSmallComponent } from './home-small.component';

describe('HomeSmallComponent', () => {
  let component: HomeSmallComponent;
  let fixture: ComponentFixture<HomeSmallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSmallComponent]
    });
    fixture = TestBed.createComponent(HomeSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
