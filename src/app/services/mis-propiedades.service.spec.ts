import { TestBed } from '@angular/core/testing';

import { MisPropiedadesService } from './mis-propiedades.service';

describe('MisPropiedadesService', () => {
  let service: MisPropiedadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisPropiedadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
