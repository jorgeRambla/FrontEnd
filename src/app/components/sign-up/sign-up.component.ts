import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {UserService} from '../../services/userService/user.service';
import {LoggerService} from '../../services/shared/logger.service';
import {Router} from '@angular/router';
import {MustMatch} from '../../utils/form.utilities';

@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;


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

  public submitSignUpForm(): void {
    if (this.registerForm.get('username').valid && this.registerForm.get('password').valid
      && this.registerForm.get('fullName').valid && this.registerForm.get('email').valid) {
      this.userService.createUser(this.registerForm.get('username').value, this.registerForm.get('password').value,
        this.registerForm.get('email').value, this.registerForm.get('fullName').value)
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
