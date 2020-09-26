import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-create-question-dialog',
  templateUrl: './create-question-dialog.component.html',
  styleUrls: ['./create-question-dialog.component.scss']
})
export class CreateQuestionDialogComponent implements OnInit {

  public enabledDraft = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.enabledDraft = Boolean(data.draft);
    }
  }

  ngOnInit() {
  }

}
