import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../../services/shared/logger.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '../../../services/navigationService/navigation.service';
import {QuizService} from '../../../services/quizService/quiz.service';
import {QuestionModel} from '../../../model/question/Question.model';
import {QuestionService} from '../../../services/questionService/question.service';
import {AlertService} from '../../../services/alertingService/alert.service';
import {MatDialog, MatPaginator, MatTable, PageEvent} from '@angular/material';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {QuizRequest} from '../../../model/quiz/Quiz.request';
import {HttpErrorResponse} from '@angular/common/http';
import {QuizModel} from '../../../model/quiz/Quiz.model';
import {CreateQuestionDialogComponent} from '../create-question/dialog/create-question-dialog/create-question-dialog.component';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit, AfterViewInit, OnDestroy {
  public mobileQuery: MediaQueryList;
  public width: number;
  @Input() public quizId: number = null;
  private quiz: QuizModel = null;
  @Output() quizCreated = new EventEmitter();
  public sendingRequest = false;
  private pathSubscription;
  // Step 1
  public step1Form: FormGroup;
  // Step 2
  public step2Form: FormGroup;
  private query = '';
  @ViewChild('step2Paginator', {static: false}) paginator: MatPaginator;
  public questionsStep2: QuestionModel[] = [];
  public questionsLengthStep2 = 0;
  public displayedColumns: string[] = ['title'];
  public selectedQuestions: QuestionModel[] = [];
  // Step 3
  public step3Form: FormGroup;
  @ViewChild('step3Table', {static: false}) step3Table: MatTable<any>;
  public displayedColumnsStep3: string[] = ['index', 'title'];
  public ordered = false;
  private readonly mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private logger: LoggerService,
              private router: Router, private formBuilder: FormBuilder, private alert: AlertService,
              private quizService: QuizService, private activatedRoute: ActivatedRoute, private questionService: QuestionService,
              private navigationService: NavigationService, private dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.navigationService.displayTitle('Create new quiz');
  }

  ngOnInit() {
    if (this.router.url.match('\\/my-quizzes\\/update\\/\\d+')) {
      this.pathSubscription = this.activatedRoute.paramMap.subscribe(parameters => {
        this.quizId = parseInt(parameters.get('id'), 10);
      });
      this.navigationService.displayTitle('Edit quiz {}'.replace('{}', String(this.quizId)));
    }

    this.width = window.innerWidth;
    this.step1Form = this.formBuilder.group({
      quiz: ['', [Validators.required]],
      description: ['', []]
    });
    this.step2Form = this.formBuilder.group({
      query: ['', []]
    });
    this.step2Form.valueChanges.subscribe(() => {
      this.query = this.step2Form.get('query').value;
      this.updateList(this.paginator.pageIndex, this.paginator.pageSize);
    });
    this.step3Form = this.formBuilder.group({
      ordered: ['', []]
    });
    this.step3Form.valueChanges.subscribe(() => {
      this.ordered = this.step3Form.get('ordered').value;
    });

    if (this.quizId !== null) {
      this.quizService.getQuizById(this.quizId)
        .then(data => {
          this.quiz = data;
          if (data) {
            this.selectedQuestions = data.questions;
            this.step1Form.get('quiz').setValue(data.title);
            this.step1Form.get('description').setValue(data.description);
            this.step3Form.get('ordered').setValue(data.ordered);
            if (data.questions.length >= 5) {
              this.alert.clear(1);
            }
          }
        })
        .catch(error => {
          const httpError = error as HttpErrorResponse;
          if (Math.floor(httpError.status / 100) / 4 === 1) {
            this.router.navigate(['my-quizzes', 'new']).then(() => {
              this.logger.debug('Navigate from my-quizzes/update to my-quizzes/new');
            });
          }
        });
    }
  }

  ngAfterViewInit(): void {
    this.updateList(this.paginator.pageIndex, this.paginator.pageSize);
    if (this.selectedQuestions.length < 5) {
      this.alert.info('At least 5 questions must be selected!', 1);
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  public truncate(input: string): string {
    return input.slice(0, Math.floor(this.width / 35));
  }

  public refreshData(event?: PageEvent) {
    this.updateList(event.pageIndex, event.pageSize);
  }

  public updateList(pageIndex: number, pageSize: number) {
    this.questionService.getQuestionsPaging(false, true, pageIndex, pageSize,
      'title', 'desc', this.query)
      .then(data => {
        this.alert.clear(0);
        this.questionsStep2 = data.data;
        this.questionsLengthStep2 = data.length;
        if (this.questionsLengthStep2 === 0) {
          this.alert.info('There aren\'t questions matching search!', 0);
        }
      })
      .catch();
  }

  public toggleQuestion(question: QuestionModel) {
    this.alert.clear(1);
    const index = this.findWithAttr(this.selectedQuestions, 'id', question.id);
    if (index === -1 ) {
      this.selectedQuestions.push(question);
    } else {
      this.selectedQuestions.splice(index, 1);
    }
    this.logger.debug('Selected items: ', this.selectedQuestions.map((item) => {
      return item.id;
    }));
    if (this.selectedQuestions.length < 5) {
      this.alert.info('At least 5 questions must be selected!', 1);
    }
    if (this.step3Table) {
      this.step3Table.renderRows();
    }
  }

  public selected(id: number): boolean {
    return this.findWithAttr(this.selectedQuestions, 'id', id) !== -1;
  }

  public findWithAttr(array, attr, value) {
    for (let index = 0; index < array.length; index += 1) {
      if (array[index][attr] === value) {
        return index;
      }
    }
    return -1;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedQuestions, event.previousIndex, event.currentIndex);
    this.logger.debug('Selected items: ', this.selectedQuestions.map((item) => {
      return item.id;
    }));
    this.step3Table.renderRows();
  }

  public onSubmit(): void {
    this.buildRequestObject(true);
  }

  public draft(): void {
    this.buildRequestObject(false);
  }

  buildRequestObject(publish: boolean, redirect = true) {
    const quizRequest = new QuizRequest();
    quizRequest.title = this.step1Form.get('quiz').value;
    quizRequest.description = this.step1Form.get('description').value;
    quizRequest.publish = publish;
    quizRequest.questionsIds = this.selectedQuestions.map((item) => {
      return item.id;
    });
    quizRequest.ordered = this.ordered;
    if (this.quizId !== null) {
      this.update(quizRequest);
    } else {
      this.create(quizRequest, redirect);
    }
  }

  public create(quizRequest: QuizRequest, redirect = true) {
    this.sendingRequest = true;
    this.quizService.createQuiz(quizRequest)
      .then(() => {
        this.quizCreated.emit();
        if (redirect) {
          this.router.navigate(['my-quizzes', 'view']).then(() => {
            this.logger.debug('Navigate from my-quizzes/new to my-quizzes/view');
          });
        }
      })
      .catch(error => {
        const httpErrorResponse = error as HttpErrorResponse;
        this.logger.debug('Error creating question', httpErrorResponse);
      }).finally(() => {
        this.sendingRequest = false;
      });
  }

  public update(quizRequest: QuizRequest, redirect = true) {
    this.sendingRequest = true;
    this.quizService.updateQuiz(this.quizId, quizRequest)
      .then(() => {
        this.quizCreated.emit();
        if (redirect) {
          this.router.navigate(['my-quizzes', 'view']).then(() => {
            this.logger.debug('Navigate from my-quizzes/update/{} to my-quizzes/view'.replace('{}', String(this.quizId)));
          });
        }
      })
      .catch(error => {
        const httpErrorResponse = error as HttpErrorResponse;
        this.logger.debug('Error updating question', httpErrorResponse);
      }).finally(() => {
      this.sendingRequest = false;
    });
  }

  public enableSubmitButton(): boolean {
    return this.step1Form.controls.quiz.valid &&
      this.selectedQuestions.length >= 5;
  }

  public draftValid(): boolean {
    return this.step1Form.controls.quiz.valid;
  }

  public showCreateQuestionDialog() {
    this.dialog.open(CreateQuestionDialogComponent, {
      data: {
        draft: false
      },
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result !== '') {
        this.updateList(this.paginator.pageIndex, this.paginator.pageSize);
      }
    });
  }
}
