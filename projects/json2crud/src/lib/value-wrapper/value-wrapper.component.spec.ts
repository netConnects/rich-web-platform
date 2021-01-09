import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueWrapperComponent } from './value-wrapper.component';

describe('ValueWrapperComponent', () => {
  let component: ValueWrapperComponent;
  let fixture: ComponentFixture<ValueWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
