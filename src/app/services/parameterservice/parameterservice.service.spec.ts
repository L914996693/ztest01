import { TestBed } from '@angular/core/testing';

import { ParameterserviceService } from './parameterservice.service';

describe('ParameterserviceService', () => {
  let service: ParameterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParameterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
