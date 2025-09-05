import { TestBed } from '@angular/core/testing';

import { CaliPropiedadService } from './cali-propiedad.service';

describe('CaliPropiedadService', () => {
  let service: CaliPropiedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaliPropiedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
