import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOrdersComponent } from './project-orders.component';

describe('ProjectOrdersComponent', () => {
  let component: ProjectOrdersComponent;
  let fixture: ComponentFixture<ProjectOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
