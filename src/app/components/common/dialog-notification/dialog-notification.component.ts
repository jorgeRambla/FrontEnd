import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

class DialogData {
  title: any;
  content: any;
}

@Component({
  selector: 'app-dialog-notification',
  templateUrl: './dialog-notification.component.html',
  styleUrls: ['./dialog-notification.component.scss']
})
export class DialogNotificationComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}
