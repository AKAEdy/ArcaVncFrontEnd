import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAdoptanteComponent } from './registrar-adoptante.component';

describe('RegistrarAdoptanteComponent', () => {
  let component: RegistrarAdoptanteComponent;
  let fixture: ComponentFixture<RegistrarAdoptanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAdoptanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAdoptanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
