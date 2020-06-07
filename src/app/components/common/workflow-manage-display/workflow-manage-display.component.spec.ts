import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowManageDisplayComponent } from './workflow-manage-display.component';

describe('WorflowManageDisplayComponent', () => {
  let component: WorkflowManageDisplayComponent;
  let fixture: ComponentFixture<WorkflowManageDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowManageDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowManageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
