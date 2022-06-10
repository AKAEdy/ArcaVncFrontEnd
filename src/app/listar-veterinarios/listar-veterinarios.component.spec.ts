import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVeterinariosComponent } from './listar-veterinarios.component';

describe('ListarVeterinariosComponent', () => {
  let component: ListarVeterinariosComponent;
  let fixture: ComponentFixture<ListarVeterinariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVeterinariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVeterinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
