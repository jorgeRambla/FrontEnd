import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/userService/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav-nav',
  templateUrl: './sidenav-nav.component.html',
  styleUrls: ['./sidenav-nav.component.scss']
})
export class SidenavNavComponent implements OnInit {
  public showNavigation: boolean;
  constructor(private userService: UserService, private router: Router) {
    this.showNavigation = userService.sessionIsActive();
    this.router.events.subscribe((val) => this.showNavigation = userService.sessionIsActive());
  }

  ngOnInit() {
  }

}
