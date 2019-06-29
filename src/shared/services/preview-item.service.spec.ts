import { TestBed } from '@angular/core/testing';

import { PreviewItemService } from './preview-item.service';

describe('PreviewItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreviewItemService = TestBed.get(PreviewItemService);
    expect(service).toBeTruthy();
  });
});
