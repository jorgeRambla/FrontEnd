import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/userService/user.service';
import {LoggerService} from '../../services/shared/logger.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public username: FormControl = new FormControl('', [Validators.required]);
  public password: FormControl = new FormControl('', [Validators.required]);
  public fullName: FormControl = new FormControl('', [Validators.required]);
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private userService: UserService, private logger: LoggerService, private router: Router) { }

  ngOnInit() {
  }

  public submitSignUpForm(): void {
    if (this.username.valid && this.password.valid && this.fullName.valid && this.email.valid) {
      this.userService.createUser(this.username.value, this.password.value, this.email.value, this.fullName.value)
        .then(() => {
          this.router.navigate(['']).then( () => {
            this.logger.debug('Navigate from register to HOME');
          });
        })
        .catch(error => {
          this.logger.info('', error);
        });
    }
  }
}
