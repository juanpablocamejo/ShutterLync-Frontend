import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewGridItemComponent } from './preview-grid-item.component';

describe('PreviewGridItemComponent', () => {
  let component: PreviewGridItemComponent;
  let fixture: ComponentFixture<PreviewGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
