import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVeterinariosComponent } from './registrar-veterinarios.component';

describe('RegistrarVeterinariosComponent', () => {
  let component: RegistrarVeterinariosComponent;
  let fixture: ComponentFixture<RegistrarVeterinariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarVeterinariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarVeterinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
