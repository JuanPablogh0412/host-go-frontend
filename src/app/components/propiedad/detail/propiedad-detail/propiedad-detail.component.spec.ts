import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadDetailComponent } from './propiedad-detail.component';

describe('PropiedadDetailComponent', () => {
  let component: PropiedadDetailComponent;
  let fixture: ComponentFixture<PropiedadDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
