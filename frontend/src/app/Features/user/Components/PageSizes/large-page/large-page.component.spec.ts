import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargePageComponent } from './large-page.component';

describe('LargePageComponent', () => {
  let component: LargePageComponent;
  let fixture: ComponentFixture<LargePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LargePageComponent]
    });
    fixture = TestBed.createComponent(LargePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
