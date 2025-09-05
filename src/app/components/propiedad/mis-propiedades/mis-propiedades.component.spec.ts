import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPropiedadesComponent } from './mis-propiedades.component';

describe('MisPropiedadesComponent', () => {
  let component: MisPropiedadesComponent;
  let fixture: ComponentFixture<MisPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisPropiedadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
