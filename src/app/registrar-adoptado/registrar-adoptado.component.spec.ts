import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAdoptadoComponent } from './registrar-adoptado.component';

describe('RegistrarAdoptadoComponent', () => {
  let component: RegistrarAdoptadoComponent;
  let fixture: ComponentFixture<RegistrarAdoptadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAdoptadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAdoptadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
