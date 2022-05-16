import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVoluntariadoComponent } from './registrar-voluntariado.component';

describe('RegistrarVoluntariadoComponent', () => {
  let component: RegistrarVoluntariadoComponent;
  let fixture: ComponentFixture<RegistrarVoluntariadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarVoluntariadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarVoluntariadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
