import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCarnetComponent } from './registro-carnet.component';

describe('RegistroCarnetComponent', () => {
  let component: RegistroCarnetComponent;
  let fixture: ComponentFixture<RegistroCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCarnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
