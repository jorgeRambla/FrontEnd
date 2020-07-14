import {WorkflowStatusModel} from '../workflow/WorkflowStatus.model';
import {QuestionModel} from '../question/Question.model';

export class QuizModel {
  id: number;
  title: string;
  description: string;
  status: WorkflowStatusModel;
  approved: boolean;
  public: boolean;
  closed: boolean;
  ordered: boolean;
  questions: QuestionModel[];
}
