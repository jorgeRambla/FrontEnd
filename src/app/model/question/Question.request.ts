import {OptionRequest} from '../option/Option.request';

export class QuestionRequest {
  title: string;
  description: string;
  options: OptionRequest[];
  publish: boolean;
}
