import { TestBed } from '@angular/core/testing';

import { MinimarketService } from './minimarket.service';

describe('MinimarketService', () => {
  let service: MinimarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinimarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
