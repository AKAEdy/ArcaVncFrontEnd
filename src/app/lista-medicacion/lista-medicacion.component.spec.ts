import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMedicacionComponent } from './lista-medicacion.component';

describe('ListaMedicacionComponent', () => {
  let component: ListaMedicacionComponent;
  let fixture: ComponentFixture<ListaMedicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMedicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMedicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
