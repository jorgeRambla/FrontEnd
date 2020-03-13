import {WorkflowModel} from '../workflow/Workflow.model';

export class EditorRequestModel {
  id: number;
  description: string;
  closed: boolean;
  approved: boolean;
  workflow: WorkflowModel;
  lastWorkflow: WorkflowModel;
}
