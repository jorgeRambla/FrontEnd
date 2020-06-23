import {Component, Input, OnInit} from '@angular/core';
import {WorkflowStatusModel} from '../../../model/workflow/WorkflowStatus.model';

@Component({
  selector: 'app-status-tag',
  templateUrl: './status-tag.component.html',
  styleUrls: ['./status-tag.component.scss']
})
export class StatusTagComponent implements OnInit {
  @Input() status: WorkflowStatusModel = null;
  constructor() { }

  ngOnInit() {
  }

  replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

}
