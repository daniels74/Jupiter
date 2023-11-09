import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallPageComponent } from './small-page.component';

describe('SmallPageComponent', () => {
  let component: SmallPageComponent;
  let fixture: ComponentFixture<SmallPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallPageComponent]
    });
    fixture = TestBed.createComponent(SmallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
