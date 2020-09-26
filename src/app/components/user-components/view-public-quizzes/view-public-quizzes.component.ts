import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../../../services/shared/logger.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertService} from '../../../services/alertingService/alert.service';
import {NavigationService} from '../../../services/navigationService/navigation.service';
import {QuizSimplified} from '../../../model/quiz/Quiz.simplified';
import {QuizService} from '../../../services/quizService/quiz.service';
import {MurcyIcons} from '../../../services/shared/murcy.icons';

@Component({
  selector: 'app-view-public-quizzes',
  templateUrl: './view-public-quizzes.component.html',
  styleUrls: ['./view-public-quizzes.component.scss']
})
export class ViewPublicQuizzesComponent implements OnInit {
  private static DEFAULT_PAGE_SIZE = 5;

  public resultsLength = 0;
  public quizzes: QuizSimplified[] = [];
  public filterForm: FormGroup;
  public query = '';
  public showMoreEnabled = false;
  private currentPage = 0;
  private width: number;

  constructor(private logger: LoggerService, private quizService: QuizService, private formBuilder: FormBuilder,
              private alert: AlertService, private navigationService: NavigationService, public icons: MurcyIcons) {
    this.navigationService.displayTitle('Search quiz to play');
  }

  ngOnInit() {
    this.width = window.innerWidth;
    this.filterForm = this.formBuilder.group({
      query: ['']
    });
    this.filterForm.valueChanges.subscribe(() => {
      this.currentPage = 0;
      this.quizzes = [];
      this.showMoreEnabled = false;
      this.query = this.filterForm.get('query').value;
      this.getSearchedQuizzes();
    });
    this.getSearchedQuizzes();
  }

  public showMore(): void {
    this.getSearchedQuizzes();
  }

  public getSearchedQuizzes() {
    this.quizService.getQuizSearchPaging(this.query, this.currentPage, ViewPublicQuizzesComponent.DEFAULT_PAGE_SIZE,
      'title', 'desc')
      .then(data => {
        this.resultsLength = data.length;
        this.quizzes = this.quizzes.concat(data.data);
        this.quizzes = this.quizzes.filter(
          (quiz, index, array) => array.findIndex(t => (t.id === quiz.id)) === index);
        this.showMoreEnabled = this.resultsLength > this.quizzes.length;
      })
      .catch()
      .finally(() => {
        this.currentPage++;
      });
  }

  public truncate(input: string): string {
    if (input.length > Math.floor(this.width / 30)) {
      return input.slice(0, Math.floor(this.width / 30)).concat('...');
    } else {
      return input;
    }
  }
}
