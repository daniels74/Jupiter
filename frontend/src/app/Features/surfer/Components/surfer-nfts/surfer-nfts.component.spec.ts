import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurferNftsComponent } from './surfer-nfts.component';

describe('SurferNftsComponent', () => {
  let component: SurferNftsComponent;
  let fixture: ComponentFixture<SurferNftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurferNftsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurferNftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
