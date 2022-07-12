import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSeguimientoComponent } from './registrar-seguimiento.component';

describe('RegistrarSeguimientoComponent', () => {
  let component: RegistrarSeguimientoComponent;
  let fixture: ComponentFixture<RegistrarSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarSeguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
