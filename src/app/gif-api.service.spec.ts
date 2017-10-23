import { TestBed, inject } from '@angular/core/testing';

import { GifApiService } from './gif-api.service';

describe('GifApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GifApiService]
    });
  });

  it('should be created', inject([GifApiService], (service: GifApiService) => {
    expect(service).toBeTruthy();
  }));
});
