import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFichaComponent } from './edit-ficha.component';

describe('EditFichaComponent', () => {
  let component: EditFichaComponent;
  let fixture: ComponentFixture<EditFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
