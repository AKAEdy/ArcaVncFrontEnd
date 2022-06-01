import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVacunasComponent } from './registrar-vacunas.component';

describe('RegistrarVacunasComponent', () => {
  let component: RegistrarVacunasComponent;
  let fixture: ComponentFixture<RegistrarVacunasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarVacunasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarVacunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
