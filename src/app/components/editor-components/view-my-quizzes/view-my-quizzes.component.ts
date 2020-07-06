import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {QuestionModel} from '../../../model/question/Question.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatPaginator, MatSort, PageEvent} from '@angular/material';
import {LoggerService} from '../../../services/shared/logger.service';
import {AlertService} from '../../../services/alertingService/alert.service';
import {QuizModel} from '../../../model/quiz/Quiz.model';
import {QuizService} from '../../../services/quizService/quiz.service';

@Component({
  selector: 'app-view-my-quizzes',
  templateUrl: './view-my-quizzes.component.html',
  styleUrls: ['./view-my-quizzes.component.scss']
})
export class ViewMyQuizzesComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'title', 'status', 'menu'];
  public quizzes: QuizModel[] = [];
  public resultsLength = 0;
  public filterForm: FormGroup;
  public filtered = false;
  public query = '';
  private width: number;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private logger: LoggerService, private quizService: QuizService, private formBuilder: FormBuilder,
              private alert: AlertService) { }

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

  public filter(): void {
    // Reset Paginator
    this.paginator.pageIndex = 0;
    // Set request filters
    this.filtered = this.filterForm.get('filter').value !== 'all';
    this.query = this.filterForm.get('query').value;
    this.refreshList();
  }

  public updateList(pageIndex: number, pageSize: number) {
    this.quizService.getQuizzesPaging(!this.filtered, true, pageIndex, pageSize,
      this.sort.active, this.sort.direction, this.query)
      .then(data => {
        this.alert.clear();
        this.quizzes = data.data;
        this.resultsLength = data.length;
        if (this.resultsLength === 0) {
          this.alert.info('There aren\'t quizzes with given filters!');
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
    this.quizService.deleteQuizById(id).then(() => {
      this.refreshList();
    });
  }

}
