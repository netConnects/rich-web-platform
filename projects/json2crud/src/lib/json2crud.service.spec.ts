import { TestBed } from '@angular/core/testing';

import { Json2crudService } from './json2crud.service';

describe('Json2crudService', () => {
  let service: Json2crudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Json2crudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
