import { TestBed } from '@angular/core/testing';

import { MemeberService } from './memeber.service';

describe('MemeberService', () => {
  let service: MemeberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemeberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
