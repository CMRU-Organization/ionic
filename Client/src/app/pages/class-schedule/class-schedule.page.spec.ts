import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSchedulePage } from './class-schedule.page';

describe('ClassSchedulePage', () => {
  let component: ClassSchedulePage;
  let fixture: ComponentFixture<ClassSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
