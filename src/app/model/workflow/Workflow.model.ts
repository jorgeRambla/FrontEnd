import {WorkflowStatusModel} from './WorkflowStatus.model';

export class WorkflowModel {
  id: number;
  title: string;
  description: string;
  descriptionBy: string;
  status: WorkflowStatusModel;
  statusBy: string;
  statusDate: Date;
  response: string;
  nextWorkflow: WorkflowModel;
}
