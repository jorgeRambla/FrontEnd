import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/userService/user.service';

@Component({
  selector: 'app-sidenav-nav',
  templateUrl: './sidenav-nav.component.html',
  styleUrls: ['./sidenav-nav.component.scss']
})
export class SidenavNavComponent implements OnInit {
  public showNavigation: boolean;
  constructor(private userService: UserService) {
    this.showNavigation = userService.sessionIsActive();
  }

  ngOnInit() {
  }

}
