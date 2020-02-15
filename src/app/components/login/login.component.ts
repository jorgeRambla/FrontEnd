import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/userService/user.service';
import {LoggerService} from '../../services/shared/logger.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: FormControl = new FormControl('', [Validators.required]);
  public password: FormControl = new FormControl('', [Validators.required]);

  constructor(private userService: UserService, private logger: LoggerService, private router: Router) { }

  ngOnInit() {
  }
  public submitLoginForm(): void {
    if (this.username.valid && this.password.valid) {
      this.userService.login(this.username.value, this.password.value)
        .finally(() => {
          this.router.navigate(['']).finally(() => {
            this.logger.debug('Nav to HOME from login');
          });
        })
        .catch(error => {
          this.logger.error('', error);
        });
    }
  }
}
