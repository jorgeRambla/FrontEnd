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
    /*userService.login('yorch044', 'yorch044')
      .then(data => console.log(data))
      .catch(error => error);*/
    /*userService.createUser('test', 'test', 'yorch044zgz@gmail.com', 'Jorge Rambla Gonzalez').then().catch();*/
  }
}
