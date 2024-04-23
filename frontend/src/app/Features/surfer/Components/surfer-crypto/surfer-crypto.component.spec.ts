import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurferCryptoComponent } from './surfer-crypto.component';

describe('SurferCryptoComponent', () => {
  let component: SurferCryptoComponent;
  let fixture: ComponentFixture<SurferCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurferCryptoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurferCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
