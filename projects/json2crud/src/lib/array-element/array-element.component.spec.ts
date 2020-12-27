import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayElementComponent } from './array-element.component';

describe('ArrayElementComponent', () => {
  let component: ArrayElementComponent;
  let fixture: ComponentFixture<ArrayElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
