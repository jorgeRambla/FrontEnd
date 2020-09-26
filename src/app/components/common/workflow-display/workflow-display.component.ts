import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {WorkflowModel} from '../../../model/workflow/Workflow.model';
import {MediaMatcher} from '@angular/cdk/layout';
import {WorkflowStatusModel} from '../../../model/workflow/WorkflowStatus.model';

@Component({
  selector: 'app-workflow-display',
  templateUrl: './workflow-display.component.html',
  styleUrls: ['./workflow-display.component.scss']
})
export class WorkflowDisplayComponent implements OnChanges, OnDestroy {

  @Input() public workflow: WorkflowModel = null;
  @Input() public lastWorkflow: WorkflowModel = null;
  public mobileQuery: MediaQueryList;

  private readonly mobileQueryListener: () => void;

  public workflowModels: WorkflowModel[] = [];

  constructor(media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnChanges() {
    this.workflowModels = [];
    while (this.workflow != null && this.workflow.nextWorkflow != null) {
      this.workflowModels.push(this.workflow);
      this.workflow = this.workflow.nextWorkflow;
    }
    if (this.lastWorkflow != null) {
      this.workflowModels.push(this.lastWorkflow);
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  public lastWorkflowIsApproved(): boolean {
    return this.lastWorkflow.status === WorkflowStatusModel.APPROVED;
  }
}
