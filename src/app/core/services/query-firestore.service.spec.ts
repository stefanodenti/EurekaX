import { TestBed } from '@angular/core/testing';

import { QueryFirestoreService } from './query-firestore.service';

describe('QueryFirestoreService', () => {
  let service: QueryFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
