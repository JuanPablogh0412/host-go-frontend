import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarPropiedadComponent } from './calificar-propiedad.component';

describe('CalificarPropiedadComponent', () => {
  let component: CalificarPropiedadComponent;
  let fixture: ComponentFixture<CalificarPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificarPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificarPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
