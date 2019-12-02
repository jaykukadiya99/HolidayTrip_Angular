import { TestBed } from '@angular/core/testing';

import { CountTotalService } from './count-total.service';

describe('CountTotalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountTotalService = TestBed.get(CountTotalService);
    expect(service).toBeTruthy();
  });
});
