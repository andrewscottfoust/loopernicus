import { TestBed, inject } from '@angular/core/testing';

import { LoopsService } from './loops.service';

describe('LoopsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoopsService]
    });
  });

  it('should be created', inject([LoopsService], (service: LoopsService) => {
    expect(service).toBeTruthy();
  }));
});
