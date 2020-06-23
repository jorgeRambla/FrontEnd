import {OptionModel} from '../option/Option.model';

export class QuestionModel {
  id: number;
  title: string;
  description: string;
  isMultiple: boolean;
  published: boolean;
  options: OptionModel[];
}
