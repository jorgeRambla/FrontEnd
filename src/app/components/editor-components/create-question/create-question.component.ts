import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {LoggerService} from '../../../services/shared/logger.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit, AfterViewInit {
  constructor(private logger: LoggerService, private router: Router, private formBuilder: FormBuilder) { }
  questionForm: FormGroup;
  optionsNumbers: number[];
  private nextId: number;
  private deleted = false;

  @Input() public popup = false;

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
      question: ['', [Validators.required]]
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
}
