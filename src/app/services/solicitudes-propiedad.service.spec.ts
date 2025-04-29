import { TestBed } from '@angular/core/testing';

import { SolicitudesPropiedadService } from './solicitudes-propiedad.service';

describe('SolicitudesPropiedadService', () => {
  let service: SolicitudesPropiedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudesPropiedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
