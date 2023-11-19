import { TestBed } from '@angular/core/testing';

import { ApiConnectionService } from './api-connection.service';

describe('ConnectionService', () => {
  let service: ApiConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
