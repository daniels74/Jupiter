import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurferBasicInfoComponent } from './surfer-basic-info.component';

describe('SurferBasicInfoComponent', () => {
  let component: SurferBasicInfoComponent;
  let fixture: ComponentFixture<SurferBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurferBasicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurferBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
