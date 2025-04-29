import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadEditComponent } from './propiedad-edit.component';

describe('PropiedadEditComponent', () => {
  let component: PropiedadEditComponent;
  let fixture: ComponentFixture<PropiedadEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
