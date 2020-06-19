import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../../services/userService/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnChanges {

  public showNavigation: boolean;
  constructor(private userService: UserService) {
    this.showNavigation = userService.sessionIsActive();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showNavigation = this.userService.sessionIsActive();
  }

}
