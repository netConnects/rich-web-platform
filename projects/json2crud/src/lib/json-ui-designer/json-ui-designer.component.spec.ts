import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonUiDesignerComponent } from './json-ui-designer.component';

describe('JsonUiDesignerComponent', () => {
  let component: JsonUiDesignerComponent;
  let fixture: ComponentFixture<JsonUiDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonUiDesignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonUiDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
