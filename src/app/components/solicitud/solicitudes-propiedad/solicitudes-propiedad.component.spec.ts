import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesPropiedadComponent } from './solicitudes-propiedad.component';

describe('SolicitudesPropiedadComponent', () => {
  let component: SolicitudesPropiedadComponent;
  let fixture: ComponentFixture<SolicitudesPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
