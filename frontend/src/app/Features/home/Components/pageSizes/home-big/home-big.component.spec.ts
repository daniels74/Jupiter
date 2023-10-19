import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBigComponent } from './home-big.component';

describe('HomeBigComponent', () => {
  let component: HomeBigComponent;
  let fixture: ComponentFixture<HomeBigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeBigComponent]
    });
    fixture = TestBed.createComponent(HomeBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
