import { TestBed } from '@angular/core/testing';

import { AgoService } from './ago.service';

describe('AgoService', () => {
  let service: AgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
