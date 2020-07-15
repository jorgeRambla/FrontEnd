import {WorkflowStatusModel} from '../workflow/WorkflowStatus.model';
import {QuestionModel} from '../question/Question.model';
import {WorkflowModel} from '../workflow/Workflow.model';

export class QuizModel {
  id: number;
  title: string;
  description: string;
  status: WorkflowStatusModel;
  approved: boolean;
  closed: boolean;
  workflow: WorkflowModel;
  lastWorkflow: WorkflowModel;
  ordered: boolean;
  questions: QuestionModel[];
}
