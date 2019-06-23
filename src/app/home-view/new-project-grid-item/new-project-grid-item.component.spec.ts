import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectGridItemComponent } from './new-project-grid-item.component';

describe('NewProjectGridItemComponent', () => {
  let component: NewProjectGridItemComponent;
  let fixture: ComponentFixture<NewProjectGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
