/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegisanimalService } from './regisanimal.service';

describe('Service: Regisanimal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisanimalService]
    });
  });

  it('should ...', inject([RegisanimalService], (service: RegisanimalService) => {
    expect(service).toBeTruthy();
  }));
});
