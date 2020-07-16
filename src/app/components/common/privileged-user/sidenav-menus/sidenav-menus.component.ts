import {Component, Input, OnInit} from '@angular/core';
import {PermissionService} from '../../../../services/permissionService/permission.service';
import {LoggerService} from '../../../../services/shared/logger.service';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';
import {faChartLine, faSignOutAlt, faHeart, faUser, faHistory} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav-menus',
  templateUrl: './sidenav-menus.component.html',
  styleUrls: ['./sidenav-menus.component.scss']
})
export class SidenavMenusComponent implements OnInit {

  constructor(private permissionService: PermissionService, private logger: LoggerService, private router: Router) {
  }

  hasUserPermission: boolean;
  hasEditorPermission: boolean;
  hasReviewerPermission: boolean;
  hasAdminPermission: boolean;
  username: string;
  @Input() public sideNav: MatSidenav;

  // icons
  public statsIcon = faChartLine;
  public logOutIcon = faSignOutAlt;
  public heartIcon = faHeart;
  public userIcon = faUser;
  public history = faHistory;

  ngOnInit() {
    this.hasUserPermission = this.permissionService.hasUserPermission();
    this.hasEditorPermission = this.permissionService.hasEditorPermission();
    this.hasReviewerPermission = this.permissionService.hasReviewerPermission();
    this.hasAdminPermission = this.permissionService.hasAdminPermission();

    // Set Username or default value if user touch localStorage
    this.username = localStorage.getItem('user.username');
    if (this.username === null) {
      this.username = 'Hacker-man';
    }
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      this.logger.debug('Session closed');
    });
  }

}
