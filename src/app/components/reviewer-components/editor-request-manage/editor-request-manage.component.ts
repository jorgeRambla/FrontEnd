import {Component, OnInit, ViewChild} from '@angular/core';
import {LoggerService} from '../../../services/shared/logger.service';
import {RequestService} from '../../../services/requestService/request.service';
import {MatPaginator, MatSort} from '@angular/material';
import {AlertService} from '../../../services/alertingService/alert.service';
import {RequestModel} from '../../../model/EditorRequest/EditorRequest.model';

@Component({
  selector: 'app-editor-request-manage',
  templateUrl: './editor-request-manage.component.html',
  styleUrls: ['./editor-request-manage.component.scss']
})
export class EditorRequestManageComponent implements OnInit {
  public editorRequests: RequestModel[] = [];
  public resultsLength = 0;

  constructor(private logger: LoggerService, private requestService: RequestService, private alert: AlertService) {
  }

  ngOnInit(): void {
  }

  public updateList(search: any, paginator: any, sort: any) {
    this.requestService.getEditorRequestsPaging(!search.filtered, search.closed, search.approved, paginator.index,
      paginator.size, sort.active, sort.direction)
      .then(data => {
        this.alert.clear();
        this.editorRequests = data.data;
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
