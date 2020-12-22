import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Json2crudComponent } from './json2crud.component';

describe('Json2crudComponent', () => {
  let component: Json2crudComponent;
  let fixture: ComponentFixture<Json2crudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Json2crudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Json2crudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
