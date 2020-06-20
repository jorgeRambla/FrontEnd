import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {LoggerService} from '../../../services/shared/logger.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {QuestionService} from '../../../services/questionService/question.service';
import {QuestionRequest} from '../../../model/question/Question.request';
import {OptionRequest} from '../../../model/option/Option.request';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit, AfterViewInit {
  constructor(private logger: LoggerService, private router: Router, private formBuilder: FormBuilder,
              private  questionService: QuestionService) { }
  questionForm: FormGroup;
  optionsNumbers: number[];
  sendingRequest = false;
  private nextId: number;
  private deleted = false;

  @Input() public popup = false;
  @Input() public questionId: number = null;
  @Output() questionCreated = new EventEmitter();

  @ViewChildren('Options') optionsElements: QueryList<ElementRef>;

  private static deleteArrayItem(array: any, item: any): boolean {
    const index = array.indexOf(item, 0);
    if (index > -1) {
      array.splice(index, 1);
    }
    return index !== -1;
  }

  ngOnInit() {

    // TODO: OnEdit fill with options
    this.optionsNumbers = [1, 2];

    this.questionForm = this.formBuilder.group({
      question: ['', [Validators.required]],
      description: ['', []]
    });

    this.optionsNumbers.forEach(item => {
      const formItem = 'option'.concat(String(item));
      this.questionForm.addControl(formItem, new FormControl('', [Validators.required]));
      this.questionForm.addControl(formItem.concat('_slider'), new FormControl('', []));
      this.questionForm.get(formItem).valueChanges.subscribe(() => {
        this.optionChanged(formItem);
      });
      this.nextId = item + 1;
    });
  }

  ngAfterViewInit() {
    this.optionsElements.changes.subscribe(() => {
      if (this.optionsNumbers.length > 2 || this.deleted) {
        this.optionsElements.last.nativeElement.focus();
      }
    });
  }

  public form() {
    return this.questionForm.controls;
  }

  displayNextInput(): boolean {
    let somethingEmpty = false;
    this.optionsNumbers.forEach(item => {
      const id = 'option'.concat(String(item));
      if (!this.questionForm.get(id).value) {
        somethingEmpty = true;
      }
    });
    return !somethingEmpty;
  }

  enableSubmitButton(): boolean {
    this.logger.debug('enableSubmitButton', {
      question: this.form().question.valid,
      description: this.form().description.valid,
      options: this.optionsNumbers.length >= 2,
      option1: this.form()['option'.concat(String(this.optionsNumbers[0]))].valid,
      option2: this.form()['option'.concat(String(this.optionsNumbers[1]))].valid,
      sendingRequest: !this.sendingRequest
    });
    return this.form().question.valid
      && this.form().description.valid
      && this.optionsNumbers.length >= 2
      && this.form()['option'.concat(String(this.optionsNumbers[0]))].valid
      && this.form()['option'.concat(String(this.optionsNumbers[1]))].valid
      && !this.sendingRequest;
  }

  focusOnNext(): void {
    const formItem = 'option'.concat(String(this.nextId));
    this.questionForm.addControl(formItem, new FormControl('', [Validators.required]));
    this.questionForm.get(formItem).valueChanges.subscribe(() => {
      this.optionChanged(formItem);
    });
    this.questionForm.addControl(formItem.concat('_slider'), new FormControl('', []));
    this.optionsNumbers.push(this.nextId);
    this.nextId++;
  }

  optionChanged(formIdentifier: string) {
    if (this.optionsNumbers.length > 2) {
      const id = parseInt(formIdentifier.replace('option', ''), 10);
      const optionContent = this.questionForm.get(formIdentifier).value;
      if (!optionContent) {
        // if it's empty just delete form control
        this.questionForm.removeControl(formIdentifier);
        this.questionForm.removeControl(formIdentifier.concat('_slider'));
        CreateQuestionComponent.deleteArrayItem(this.optionsNumbers, id);
        this.deleted = true;
      }
    } else {
      this.deleted = false;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.optionsNumbers, event.previousIndex, event.currentIndex);
  }

  buildRequestObject(publish: boolean, pruneLastEmpty: boolean) {
    const questionRequest = new QuestionRequest();
    questionRequest.title = this.questionForm.get('question').value;
    questionRequest.description = this.questionForm.get('description').value;
    questionRequest.publish = publish;
    questionRequest.options = [];
    this.optionsNumbers.forEach(item => {
      const id = 'option'.concat(String(item));
      const option = new OptionRequest();
      option.title = this.questionForm.get(id).value;
      option.correct = this.questionForm.get(id.concat('_slider')).value !== '';
      if (option.title !== '' || !pruneLastEmpty) {
        questionRequest.options.push(option);
      }
    });
    if (this.questionId != null) {
      this.update(questionRequest);
    } else {
      this.create(questionRequest);
    }
  }

  onSubmit() {
    this.buildRequestObject(true, true);
  }

  draft() {
    this.buildRequestObject(false, false);
  }

  private create(question: QuestionRequest) {
    this.sendingRequest = true;
    this.questionService.createQuestion(question)
      .then(() => {
        this.questionCreated.emit();
        if (!this.popup) {
          this.router.navigate(['my-questions', 'view']).then(() => {
            this.logger.debug('Navigate from my-questions/new to my-questions/view');
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

  private update(question: QuestionRequest) {
    this.questionCreated.emit();
    if (!this.popup) {
      this.router.navigate(['my-questions', 'view']).then(() => {
        this.logger.debug('Navigate from my-questions/new to my-questions/view');
      });
    }
  }
}