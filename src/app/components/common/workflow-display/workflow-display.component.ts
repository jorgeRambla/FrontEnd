import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {WorkflowModel} from '../../../model/workflow/Workflow.model';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-workflow-display',
  templateUrl: './workflow-display.component.html',
  styleUrls: ['./workflow-display.component.scss']
})
export class WorkflowDisplayComponent implements OnInit, OnDestroy {

  @Input() private workflow: WorkflowModel = null;
  @Input() public lastWorkflow: WorkflowModel = null;
  public mobileQuery: MediaQueryList;

  private readonly mobileQueryListener: () => void;

  public workflowModels: WorkflowModel[] = [];

  constructor(media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit() {
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

}
