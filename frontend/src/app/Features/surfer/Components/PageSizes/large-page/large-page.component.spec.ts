import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargePageComponent } from './large-page.component';

describe('LargePageComponent', () => {
  let component: LargePageComponent;
  let fixture: ComponentFixture<LargePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LargePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
