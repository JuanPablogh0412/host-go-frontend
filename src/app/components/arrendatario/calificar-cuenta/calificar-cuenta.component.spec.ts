import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarCuentaComponent } from './calificar-cuenta.component';

describe('CalificarCuentaComponent', () => {
  let component: CalificarCuentaComponent;
  let fixture: ComponentFixture<CalificarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificarCuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
