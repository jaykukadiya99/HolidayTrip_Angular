import { TestBed } from '@angular/core/testing';

import { InquiryService } from './inquiry.service';

describe('InquiryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InquiryService = TestBed.get(InquiryService);
    expect(service).toBeTruthy();
  });
});
