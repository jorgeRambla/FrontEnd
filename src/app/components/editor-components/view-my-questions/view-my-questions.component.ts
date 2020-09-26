import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {QuestionModel} from '../../../model/question/Question.model';
import {MatDialog, MatPaginator, MatSort, PageEvent} from '@angular/material';
import {LoggerService} from '../../../services/shared/logger.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuestionService} from '../../../services/questionService/question.service';
import {AlertService} from '../../../services/alertingService/alert.service';
import {NavigationService} from '../../../services/navigationService/navigation.service';
import {CreateQuestionDialogComponent} from '../create-question/dialog/create-question-dialog/create-question-dialog.component';

@Component({
  selector: 'app-view-my-questions',
  templateUrl: './view-my-questions.component.html',
  styleUrls: ['./view-my-questions.component.scss']
})
export class ViewMyQuestionsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'title', 'status', 'menu'];
  public questions: QuestionModel[] = [];
  public resultsLength = 0;
  public filterForm: FormGroup;
  public filtered = false;
  public query = '';
  private width: number;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private logger: LoggerService, private questionService: QuestionService, private formBuilder: FormBuilder,
              private alert: AlertService, private navigationService: NavigationService, private dialog: MatDialog) {
    this.navigationService.displayTitle('My questions');
  }

  ngOnInit() {
    this.width = window.innerWidth;
    this.filterForm = this.formBuilder.group({
      query: [''],
      filter: ['all']
    });
    this.filterForm.valueChanges.subscribe(() => this.filter());
  }

  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.updateList(this.paginator.pageIndex, this.paginator.pageSize);
  }

  public showCreateQuestionDialog() {
    this.dialog.open(CreateQuestionDialogComponent, {
      data: {
        draft: true
      },
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result !== '') {
        this.refreshList();
      }
    });
  }

  public filter(): void {
    // Reset Paginator
    this.paginator.pageIndex = 0;
    // Set request filters
    this.filtered = this.filterForm.get('filter').value !== 'all';
    this.query = this.filterForm.get('query').value;
    this.refreshList();
    }

  public updateList(pageIndex: number, pageSize: number) {
    this.questionService.getQuestionsPaging(!this.filtered, true, pageIndex, pageSize,
      this.sort.active, this.sort.direction, this.query)
      .then(data => {
        this.alert.clear();
        this.questions = data.data;
        this.resultsLength = data.length;
        if (this.resultsLength === 0) {
          this.alert.info('There aren\'t questions with given filters!');
        }
      })
      .catch();
  }

  public refreshData(event?: PageEvent) {
    this.updateList(event.pageIndex, event.pageSize);
  }

  public refreshList() {
    this.updateList(this.paginator.pageIndex, this.paginator.pageSize);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.width = window.innerWidth;
  }

  public truncate(input: string): string {
    return input.slice(0, Math.floor(this.width / 35));
  }

  public deleteQuestion(id: number): void {
    this.questionService.deleteQuestionById(id).then(() => {
      this.refreshList();
    });
  }

}
