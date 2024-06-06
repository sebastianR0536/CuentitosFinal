import { TestBed } from '@angular/core/testing';

import { BookDescriptionService } from './book-description.service';

describe('BookDescriptionService', () => {
  let service: BookDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
