import { TestBed } from '@angular/core/testing';

import { NoopInterceptorInterceptor } from './noop-interceptor.interceptor';

describe('NoopInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NoopInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NoopInterceptorInterceptor = TestBed.inject(NoopInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
