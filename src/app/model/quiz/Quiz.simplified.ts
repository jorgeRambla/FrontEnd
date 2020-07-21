import {QuestionModel} from '../question/Question.model';

export class QuizSimplified {
  id: number;
  ownerUserName: string;
  title: string;
  description: string;
  questions: QuestionModel[];
  createdDate: Date;
  lastModifiedDate: Date;
}
