import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDonacionesComponent } from './registrar-donaciones.component';

describe('RegistrarDonacionesComponent', () => {
  let component: RegistrarDonacionesComponent;
  let fixture: ComponentFixture<RegistrarDonacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarDonacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
