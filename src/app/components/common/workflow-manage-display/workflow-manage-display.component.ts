import {Component, Input, OnInit} from '@angular/core';
import {WorkflowModel} from '../../../model/workflow/Workflow.model';

@Component({
  selector: 'app-workflow-manage-display',
  templateUrl: './workflow-manage-display.component.html',
  styleUrls: ['./workflow-manage-display.component.scss']
})
export class WorkflowManageDisplayComponent implements OnInit {

  @Input() workflow: WorkflowModel;
  @Input() lastWorkflow: WorkflowModel;

  constructor() { }

  ngOnInit() {
  }

}
