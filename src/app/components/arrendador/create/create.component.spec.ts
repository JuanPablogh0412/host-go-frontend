import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrendadorCreateComponent } from './create.component';

describe('ArrendadorCreateComponent', () => {
  let component: ArrendadorCreateComponent;
  let fixture: ComponentFixture<ArrendadorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendadorCreateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ArrendadorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
