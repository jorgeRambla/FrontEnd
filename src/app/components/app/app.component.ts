import { Component } from '@angular/core';
import {UserService} from '../../services/userService/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MurcyFrontEnd';

  constructor(userService: UserService) {
    userService.login('yorch044', 'yorch044')
      .then(data => console.log(data))
      .catch(error => error);
  }
}
