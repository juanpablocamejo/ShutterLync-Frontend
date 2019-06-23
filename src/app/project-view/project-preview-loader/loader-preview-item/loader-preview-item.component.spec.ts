import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderPreviewItemComponent } from './loader-preview-item.component';

describe('LoaderPreviewItemComponent', () => {
  let component: LoaderPreviewItemComponent;
  let fixture: ComponentFixture<LoaderPreviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderPreviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderPreviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
