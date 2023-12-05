import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewSmallComponent } from './chart-view-small.component';

describe('ChartViewSmallComponent', () => {
  let component: ChartViewSmallComponent;
  let fixture: ComponentFixture<ChartViewSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartViewSmallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartViewSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
