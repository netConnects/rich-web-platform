import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueElementComponent } from './value-element.component';

describe('ValueElementComponent', () => {
  let component: ValueElementComponent;
  let fixture: ComponentFixture<ValueElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
