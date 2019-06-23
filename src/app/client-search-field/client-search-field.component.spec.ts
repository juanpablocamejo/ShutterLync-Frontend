import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSearchFieldComponent } from './client-search-field.component';

describe('ClientSearchFieldComponent', () => {
  let component: ClientSearchFieldComponent;
  let fixture: ComponentFixture<ClientSearchFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSearchFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
