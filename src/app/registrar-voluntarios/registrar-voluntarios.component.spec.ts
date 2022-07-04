import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVoluntariosComponent } from './registrar-voluntarios.component';

describe('RegistrarVoluntariosComponent', () => {
  let component: RegistrarVoluntariosComponent;
  let fixture: ComponentFixture<RegistrarVoluntariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarVoluntariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarVoluntariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
