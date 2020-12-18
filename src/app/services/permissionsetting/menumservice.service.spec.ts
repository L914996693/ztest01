import { TestBed } from '@angular/core/testing';

import { MenumserviceService } from './menumservice.service';

describe('MenumserviceService', () => {
  let service: MenumserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenumserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
