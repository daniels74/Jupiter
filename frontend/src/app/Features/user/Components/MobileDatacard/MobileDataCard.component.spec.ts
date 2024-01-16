import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDatacardComponent } from './MobileDataCard.component';

describe('CryptodatacardComponent', () => {
  let component: MobileDatacardComponent;
  let fixture: ComponentFixture<MobileDatacardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileDatacardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileDatacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
