import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPreviewLoaderComponent } from './project-preview-loader.component';

describe('ProjectPreviewLoaderComponent', () => {
  let component: ProjectPreviewLoaderComponent;
  let fixture: ComponentFixture<ProjectPreviewLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPreviewLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPreviewLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
