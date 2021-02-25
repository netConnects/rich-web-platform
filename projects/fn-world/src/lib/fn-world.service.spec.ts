import { TestBed } from '@angular/core/testing';
import { assert } from 'console';
import { FnWorld } from './fn-world';

describe('FnWorldService', () => {
  let service: FnWorld.FnWorld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FnWorld.FnWorld);
  });

  it('should be created', function () {
    //   FnWorld.if(true, () => assert(true), assert(false));
  });
});
