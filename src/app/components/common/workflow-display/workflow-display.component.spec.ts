import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDisplayComponent } from './workflow-display.component';

describe('WorkflowDisplayComponent', () => {
  let component: WorkflowDisplayComponent;
  let fixture: ComponentFixture<WorkflowDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
