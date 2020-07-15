import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LoggerService} from '../../../services/shared/logger.service';
import {RequestService} from '../../../services/requestService/request.service';
import {MatPaginator, MatSort, PageEvent} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-request-manage',
  templateUrl: './request-manage.component.html',
  styleUrls: ['./request-manage.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RequestManageComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'title', 'status'];
  @Input() public requests: any[] = [];
  @Input() public resultsLength = 0;
  @Input() public classname: string = null;
  @Output() refreshList = new EventEmitter();
  public expandedElement: any | null;
  public filterForm: FormGroup;
  public filtered = true;
  public closed = false;
  private approved = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private logger: LoggerService, private requestService: RequestService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filter: ['filtered'],
      openClosed: ['open'],
      status: ['approved']
    });
    this.filterForm.valueChanges.subscribe(() => this.filter());
  }

  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.updateList(this.paginator.pageIndex, this.paginator.pageSize);
  }

  public updateList(pageIndex: number, pageSize: number) {
    this.refreshList.emit({
      paginator: {
        index: pageIndex,
        size: pageSize
      },
      search: {
        filtered: this.filtered,
        closed: this.closed,
        approved: this.approved
      },
      sort: {
        active: this.sort.active,
        direction: this.sort.direction
    }
    });
  }

  public childUpdateList() {
    this.updateList(this.paginator.pageIndex, this.paginator.pageSize);
  }

  public refreshData(event?: PageEvent) {
    this.updateList(event.pageIndex, event.pageSize);
  }

  public filter(): void {
    // Reset Paginator
    this.paginator.pageIndex = 0;

    // Set request filters
    if (this.filterForm.get('filter').value === 'all') {
      this.filtered = false;
      this.closed = false;
      this.approved = false;
    } else {
      this.filtered = true;
      if (this.filterForm.get('openClosed').value === 'open') {
        this.closed = false;
        this.approved = false;
      } else {
        this.closed = true;
        this.approved = this.filterForm.get('status').value === 'approved';
      }
    }

    // Refresh data
    this.childUpdateList();
  }

}
