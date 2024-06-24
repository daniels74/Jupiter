import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallPageComponent } from './small-page.component';

describe('SmallPageComponent', () => {
  let component: SmallPageComponent;
  let fixture: ComponentFixture<SmallPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
