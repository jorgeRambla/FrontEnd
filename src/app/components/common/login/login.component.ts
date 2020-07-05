import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../../services/userService/user.service';
import {LoggerService} from '../../../services/shared/logger.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: FormControl = new FormControl('', [Validators.required]);
  public password: FormControl = new FormControl('', [Validators.required]);
  public requesting = false;

  constructor(private userService: UserService, private logger: LoggerService, private router: Router) { }

  ngOnInit() {
  }

  public submitLoginForm(): void {
    if (this.username.valid && this.password.valid) {
      this.requesting = true;
      this.userService.login(this.username.value, this.password.value)
        .then(() => {
          this.userService.retrieveCurrentSessionUserData().then(() => {
            window.location.reload();
          });
        })
        .catch(error => {
          switch ((error as HttpErrorResponse).status) {
            case 403:
              this.username.setErrors({forbidden: true});
              this.password.setErrors({forbidden: true});
              this.logger.debug('user login FORBIDDEN');
              break;
            case 401:
              this.username.setErrors({invalid: true});
              this.password.setErrors({invalid: true});
              this.logger.debug('user login UNAUTHORIZED');
              break;
            case 500:
              this.username.setErrors({server_error: true});
              this.password.setErrors({server_error: true});
              this.logger.debug('user login SERVER_ERROR');
              break;
            default:
              break;
          }
        }).finally(() => {
          this.requesting = false;
      });
    }
  }
}
