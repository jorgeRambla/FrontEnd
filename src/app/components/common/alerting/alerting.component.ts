import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertService} from '../../../services/alertingService/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alerting.component.html',
  styleUrls: ['./alerting.component.scss']
})
export class AlertingComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  @Input() id = 0;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      if (message && message.id === this.id && !message.clear) {
        this.message = message;
      } else if (message && message.id === this.id && message.clear) {
        this.message = null;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
