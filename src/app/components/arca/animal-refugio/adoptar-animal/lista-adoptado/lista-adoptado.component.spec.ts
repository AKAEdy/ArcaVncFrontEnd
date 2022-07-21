import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdoptadoComponent } from './lista-adoptado.component';

describe('ListaAdoptadoComponent', () => {
  let component: ListaAdoptadoComponent;
  let fixture: ComponentFixture<ListaAdoptadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAdoptadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAdoptadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
