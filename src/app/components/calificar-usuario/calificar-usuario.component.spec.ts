import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarUsuarioComponent } from './calificar-usuario.component';

describe('CalificarUsuarioComponent', () => {
  let component: CalificarUsuarioComponent;
  let fixture: ComponentFixture<CalificarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificarUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
