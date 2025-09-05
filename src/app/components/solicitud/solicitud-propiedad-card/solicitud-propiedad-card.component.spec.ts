import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPropiedadCardComponent } from './solicitud-propiedad-card.component';

describe('SolicitudPropiedadCardComponent', () => {
  let component: SolicitudPropiedadCardComponent;
  let fixture: ComponentFixture<SolicitudPropiedadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudPropiedadCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudPropiedadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
