import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarnetComponent } from './edit-carnet.component';

describe('EditCarnetComponent', () => {
  let component: EditCarnetComponent;
  let fixture: ComponentFixture<EditCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
