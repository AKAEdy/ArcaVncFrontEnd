import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCarnetvacunaComponent } from './registro-carnetvacuna.component';

describe('RegistroCarnetvacunaComponent', () => {
  let component: RegistroCarnetvacunaComponent;
  let fixture: ComponentFixture<RegistroCarnetvacunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCarnetvacunaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCarnetvacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
