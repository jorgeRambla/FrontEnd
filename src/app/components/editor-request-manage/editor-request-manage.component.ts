import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {EditorRequestModel} from '../../model/EditorRequest/EditorRequest.model';
import {LoggerService} from '../../services/shared/logger.service';
import {RequestService} from '../../services/requestService/request.service';
import {MatPaginator, MatSort, PageEvent} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-editor-request-manage',
  templateUrl: './editor-request-manage.component.html',
  styleUrls: ['./editor-request-manage.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class EditorRequestManageComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'status'];
  public editorRequests: EditorRequestModel[] = [];
  public expandedElement: EditorRequestModel | null;

  public resultsLength = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private logger: LoggerService, private requestService: RequestService) {
  }

  ngAfterViewInit(): void {
    // TODO: add from to in request
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.requestService.getEditorRequestsPaging(false, false, this.paginator.pageIndex, this.paginator.pageSize)
      .then(data => {
        this.editorRequests = data.data;
        this.resultsLength = data.length;
      })
      .catch();
  }

  public childUpdateList() {
    this.requestService.getEditorRequestsPaging(false, false, this.paginator.pageIndex, this.paginator.pageSize)
      .then(data => {
        this.editorRequests = data.data;
        this.resultsLength = data.length;
      })
      .catch();
  }

  public refreshData(event?: PageEvent) {
    this.requestService.getEditorRequestsPaging(false, false, event.pageIndex, event.pageSize)
      .then(data => {
        this.editorRequests = data.data;
        this.resultsLength = data.length;
      })
      .catch();
  }

}
