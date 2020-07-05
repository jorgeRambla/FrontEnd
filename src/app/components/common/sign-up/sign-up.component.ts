import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {UserService} from '../../../services/userService/user.service';
import {LoggerService} from '../../../services/shared/logger.service';
import {Router} from '@angular/router';
import {MustMatch} from '../../../utils/form.utilities';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  public requesting = false;

  constructor(private userService: UserService, private logger: LoggerService, private router: Router, private formBuilder: FormBuilder) { }

  public form() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    }, {
      validator: MustMatch('password', 'passwordRepeat')
    });
  }

  // TODO: Add username already exists validator
  // TODO: Add email already exists validator
  // TODO: Add Password is not secure Validator

  public submitSignUpForm(): void {
    if (this.registerForm.get('username').valid && this.registerForm.get('password').valid
      && this.registerForm.get('fullName').valid && this.registerForm.get('email').valid) {
      this.requesting = true;
      this.userService.createUser(this.registerForm.get('username').value, this.registerForm.get('password').value,
        this.registerForm.get('email').value, this.registerForm.get('fullName').value)
        .then(() => {
          this.router.navigate(['']).then( () => {
            this.logger.debug('Navigate from register to HOME');
          });
        })
        .catch(unCastedError => {
          const error = unCastedError as HttpErrorResponse;
          if (error.status === 400) {
            if (error.error.message === 'email is not valid') {
              this.registerForm.get('email').setErrors({email: true});
              this.logger.debug('BAD_REQUEST: email is not valid');
            } else if (error.error.message  === 'already exists other user with that username') {
              this.registerForm.get('username').setErrors({unique_username: true});
              this.logger.debug('BAD_REQUEST: already exists other user with that username');
            } else if (error.error.message  === 'already exists other user with that email') {
              this.registerForm.get('email').setErrors({unique_email: true});
              this.logger.debug('BAD_REQUEST: already exists other user with that email');
            } else {
              this.logger.debug('BAD_REQUEST: unknown error', error);
            }
          } else if (error.status / 5 === 5) {
            this.logger.debug('Server error');
          } else {
            this.logger.debug('unknown error');
          }
        })
        .finally(() => {
          this.requesting = false;
        });
    }
  }
}

