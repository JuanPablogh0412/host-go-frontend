import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPropiedadCardComponent } from './mi-propiedad-card.component';

describe('MiPropiedadCardComponent', () => {
  let component: MiPropiedadCardComponent;
  let fixture: ComponentFixture<MiPropiedadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiPropiedadCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiPropiedadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
