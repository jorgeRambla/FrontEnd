import {WorkflowStatusModel} from '../workflow/WorkflowStatus.model';

export class QuizModel {
  id: number;
  title: string;
  description: string;
  status: WorkflowStatusModel;
  approved: boolean;
  public: boolean;
  closed: boolean;
}
