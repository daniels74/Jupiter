import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptodatacardComponent } from './cryptodatacard.component';

describe('CryptodatacardComponent', () => {
  let component: CryptodatacardComponent;
  let fixture: ComponentFixture<CryptodatacardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptodatacardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CryptodatacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
