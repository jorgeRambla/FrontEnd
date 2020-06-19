import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {WorkflowModel} from '../../../model/workflow/Workflow.model';
import {MediaMatcher} from '@angular/cdk/layout';
import {WorkflowStatusModel} from '../../../model/workflow/WorkflowStatus.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WorkflowService} from '../../../services/workflowService/workflow.service';

@Component({
  selector: 'app-workflow-manage-display',
  templateUrl: './workflow-manage-display.component.html',
  styleUrls: ['./workflow-manage-display.component.scss']
})
export class WorkflowManageDisplayComponent implements OnChanges, OnDestroy {

  @Input() workflow: WorkflowModel;
  @Input() lastWorkflow: WorkflowModel;
  @Output() refresh = new EventEmitter();

  public mobileQuery: MediaQueryList;
  public editorRequestManageForm: FormGroup;
  private readonly mobileQueryListener: () => void;
  public workflowModels: WorkflowModel[] = [];
  public isNew: boolean;

  constructor(media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private formBuilder: FormBuilder,
              private workflowService: WorkflowService) {
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

    this.editorRequestManageForm = this.formBuilder.group({
      response: ['', [Validators.required]]
    });
    this.isNew = WorkflowStatusModel[this.lastWorkflow.status].toString() === WorkflowStatusModel.PENDING.toString();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  approve() {
    this.workflowService.approveWorkflow(this.lastWorkflow.id, this.editorRequestManageForm.get('response').value)
      .then(() => {
        this.editorRequestManageForm.reset();
        this.refresh.emit();
      })
      .catch();
  }

  deny() {
    this.workflowService.denyWorkflow(this.lastWorkflow.id, this.editorRequestManageForm.get('response').value)
      .then(() => {
        this.editorRequestManageForm.reset();
        this.refresh.emit();
      })
      .catch();
  }
}
