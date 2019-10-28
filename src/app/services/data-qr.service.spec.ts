import { TestBed } from '@angular/core/testing';

import { DataQrService } from './data-qr.service';

describe('DataQrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataQrService = TestBed.get(DataQrService);
    expect(service).toBeTruthy();
  });
});
