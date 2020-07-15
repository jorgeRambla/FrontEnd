import { Component, OnInit } from '@angular/core';
import {RequestModel} from '../../../model/EditorRequest/EditorRequest.model';
import {LoggerService} from '../../../services/shared/logger.service';
import {AlertService} from '../../../services/alertingService/alert.service';
import {QuizService} from '../../../services/quizService/quiz.service';

@Component({
  selector: 'app-quiz-request-manager',
  templateUrl: './quiz-request-manager.component.html',
  styleUrls: ['./quiz-request-manager.component.scss']
})
export class QuizRequestManagerComponent implements OnInit {

  public quizRequests: RequestModel[] = [];
  public resultsLength = 0;

  constructor(private logger: LoggerService, private quizService: QuizService, private alert: AlertService) {
  }

  ngOnInit(): void {
  }

  public updateList(search: any, paginator: any, sort: any) {
    this.quizService.getQuizRequestsPaging(!search.filtered, search.closed, search.approved, paginator.index,
      paginator.size, sort.active, sort.direction)
      .then(data => {
        this.alert.clear();
        this.quizRequests = data.data;
        this.resultsLength = data.length;
        if (this.resultsLength === 0) {
          this.alert.info('There is no requests');
        }
      })
      .catch();
  }

  public refreshData(event) {
    this.updateList(event.search, event.paginator, event.sort);
  }
}
