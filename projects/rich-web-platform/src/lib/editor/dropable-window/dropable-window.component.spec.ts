import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropableWindowComponent } from './dropable-window.component';

describe('DropableWindowComponent', () => {
  let component: DropableWindowComponent;
  let fixture: ComponentFixture<DropableWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropableWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropableWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
