import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAdoptanteComponent } from './listar-adoptante.component';

describe('ListarAdoptanteComponent', () => {
  let component: ListarAdoptanteComponent;
  let fixture: ComponentFixture<ListarAdoptanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAdoptanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAdoptanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
