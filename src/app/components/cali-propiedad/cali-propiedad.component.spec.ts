import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaliPropiedadComponent } from './cali-propiedad.component';

describe('CaliPropiedadComponent', () => {
  let component: CaliPropiedadComponent;
  let fixture: ComponentFixture<CaliPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaliPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaliPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
