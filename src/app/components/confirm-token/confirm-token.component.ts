import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggerService} from '../../services/shared/logger.service';
import {UserService} from '../../services/userService/user.service';

@Component({
  selector: 'app-confirm-token',
  templateUrl: './confirm-token.component.html',
  styleUrls: ['./confirm-token.component.scss']
})
export class ConfirmTokenComponent implements OnInit, OnDestroy {

  constructor(private activatedRoute: ActivatedRoute, private logger: LoggerService, private userService: UserService,
              private router: Router) {
  }

  private subscription;
  isConfirmValid: boolean;
  timeout = 5;

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap.subscribe(parameters => {
      this.userService.confirmToken(parameters.get('token'))
        .then(() => {
          this.isConfirmValid = true;
        })
        .catch(error => {
          this.logger.debug('Cannot perform token confirmation', error);
          this.isConfirmValid = false;
        });
    });
    this.timeoutRedirect();
  }

  private timeoutRedirect() {
    const decrementTimeoutFunction = () => {
      if (this.timeout > 0) {
        this.timeout = this.timeout - 1;
      }

      if (this.timeout > 0) {
        setTimeout(decrementTimeoutFunction, 1000);
      }

      if (this.timeout === 0) {
        this.router.navigate(['']).then(() => {
          this.logger.debug('Redirect to HOME');
        });
      }
    };
    setTimeout(decrementTimeoutFunction, 1000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
