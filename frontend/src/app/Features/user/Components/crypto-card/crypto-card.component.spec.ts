import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCardComponent } from './crypto-card.component';

describe('CryptoCardComponent', () => {
  let component: CryptoCardComponent;
  let fixture: ComponentFixture<CryptoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoCardComponent]
    });
    fixture = TestBed.createComponent(CryptoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
