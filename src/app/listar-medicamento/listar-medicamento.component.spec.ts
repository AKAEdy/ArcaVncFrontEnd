import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMedicamentoComponent } from './listar-medicamento.component';

describe('ListarMedicamentoComponent', () => {
  let component: ListarMedicamentoComponent;
  let fixture: ComponentFixture<ListarMedicamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMedicamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
