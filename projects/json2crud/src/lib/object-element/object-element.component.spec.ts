import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectElementComponent } from './object-element.component';

describe('ObjectElementComponent', () => {
  let component: ObjectElementComponent;
  let fixture: ComponentFixture<ObjectElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
