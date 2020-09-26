import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../../../services/shared/logger.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavigationService} from '../../../services/navigationService/navigation.service';
import {QuizService} from '../../../services/quizService/quiz.service';
import {QuizSimplified} from '../../../model/quiz/Quiz.simplified';
import {QuestionModel} from '../../../model/question/Question.model';
import {AnswerRequest} from '../../../model/Answer/Answer.request';
import {IndividualAnswerRequest} from '../../../model/Answer/IndividualAnswer.request';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  constructor(private logger: LoggerService, private router: Router, private formBuilder: FormBuilder,
              private  quizService: QuizService, private activatedRoute: ActivatedRoute,
              private navigationService: NavigationService) {
  }

  private quizId: number = null;
  private width: number;
  private DISPLAY_TIME_TEMPLATE = 'It took you {1} minutes, {2} seconds and {3} milliseconds to answer this quiz';

  public quiz: QuizSimplified = null;
  public requesting = false;
  public error = false;
  public currentIndex = -1;
  public end = false;
  public currentQuestion: QuestionModel = null;
  public responsesData = [];
  public questionForm: FormGroup;

  public elapsedTime: number;
  public points: number;

  private static shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  ngOnInit() {
    this.width = window.innerWidth;
    this.activatedRoute.paramMap.subscribe(parameters => {
      this.quizId = parseInt(parameters.get('id'), 10);
    });
    this.requesting = true;
    this.quizService.getPublicQuizDataById(this.quizId).then(data => {
      this.quiz = data;
      if (!data.ordered) {
        PlayQuizComponent.shuffle(this.quiz.questions);
      }
      let displayTitle = data.title.toLowerCase();
      if (displayTitle.length > Math.floor(this.width / 30)) {
        displayTitle = displayTitle.slice(0, Math.floor(this.width / 30)).concat('...');
      }
      this.navigationService.displayTitle('Playing {}'.replace('{}', displayTitle));
    }).catch(() => {
      this.error = true;
      this.navigationService.clear();
    }).finally(() => {
      this.requesting = false;
    });
  }

  buildFormControl(multiple: boolean): void {
    if (multiple) {
      this.questionForm = this.formBuilder.group({
        option1: ['', []],
        option2: ['', []],
        option3: ['', []],
        option4: ['', []]
      });
    } else {
      this.questionForm = this.formBuilder.group({
        selected: ['', [Validators.required]]
      });
    }
  }

  public disableNextButton(): boolean {
    return !this.currentQuestion.isMultiple && !this.questionForm.get('selected').valid;
  }

  public start(): void {
    this.currentIndex = 0;
    this.buildFormControl(this.quiz.questions[this.currentIndex].isMultiple);
    this.currentQuestion = this.quiz.questions[this.currentIndex];
    this.responsesData[this.currentIndex] = {
      id: this.currentQuestion.id,
      time: {
        start: new Date().getTime()
      }
    };
  }

  public getSelectedOptionsIds(): number[] {
    const arrayIds = [];
    if (this.currentQuestion.isMultiple) {
      this.currentQuestion.options.forEach((option, index) => {
        const value = this.questionForm.get('option'.concat(String(index + 1))).value;
        if (value) {
          arrayIds.push(option.id);
        }
      });
    } else {
      arrayIds.push(this.questionForm.get('selected').value);
    }
    this.logger.debug('getSelectedOptionsIds', arrayIds);
    return arrayIds;
  }

  public next(): void {
    this.responsesData[this.currentIndex].time.end = new Date().getTime();
    this.responsesData[this.currentIndex].options = this.getSelectedOptionsIds();
    if (this.currentIndex === this.quiz.questions.length - 1) {
      this.end = true;
      this.submitAnswer();
    } else {
      this.currentIndex += 1;
      this.buildFormControl(this.quiz.questions[this.currentIndex].isMultiple);
      this.currentQuestion = this.quiz.questions[this.currentIndex];

      this.responsesData[this.currentIndex] = {
        id: this.currentQuestion.id,
        time: {
          start: new Date().getTime()
        }
      };
    }
    this.logger.debug('next', this.responsesData);
  }

  public formatMillisToTimeString(input: number): string {
    const milliseconds = Math.floor(input % 1000);
    const   seconds = Math.floor((input / 1000) % 60);
    const   minutes = Math.floor((input / (1000 * 60)) % 60);
    return this.DISPLAY_TIME_TEMPLATE
      .replace('{1}', String(minutes))
      .replace('{2}', String(seconds))
      .replace('{3}', String(milliseconds));
  }

  private submitAnswer(): void {
    this.requesting = true;
    const answerRequest = new AnswerRequest();
    answerRequest.individualAnswers = [];
    this.elapsedTime = 0;
    this.responsesData.forEach(item => {
      const individualAnswerRequest = new IndividualAnswerRequest();
      individualAnswerRequest.questionId = item.id;
      individualAnswerRequest.timeInMillis = item.time.end - item.time.start;
      this.elapsedTime += individualAnswerRequest.timeInMillis;
      individualAnswerRequest.optionsIds = item.options;
      answerRequest.individualAnswers.push(individualAnswerRequest);
    });
    this.logger.debug('submitAnswer', answerRequest);

    this.quizService.submitNewQuizAnswer(this.quizId, answerRequest)
      .then(data => {
        this.points = data;
      })
      .catch(error => {
        this.logger.debug('submitAnswer', error);
      })
      .finally(() => {
        this.requesting = false;
      });
  }
}
