import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {UserService} from '../../../services/userService/user.service';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-sidenav-nav',
  templateUrl: './sidenav-nav.component.html',
  styleUrls: ['./sidenav-nav.component.scss']
})
export class SidenavNavComponent implements OnInit, OnDestroy {
  public showNavigation: boolean;
  public mobileQuery: MediaQueryList;

  private readonly mobileQueryListener: () => void;

  constructor(private userService: UserService, private router: Router, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.showNavigation = userService.sessionIsActive();
    this.router.events.subscribe(() => this.showNavigation = userService.sessionIsActive());
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

}
