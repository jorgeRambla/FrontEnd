import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {UserService} from '../../../../services/userService/user.service';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {NavigationService} from '../../../../services/navigationService/navigation.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-sidenav-nav',
  templateUrl: './sidenav-nav.component.html',
  styleUrls: ['./sidenav-nav.component.scss']
})
export class SidenavNavComponent implements OnInit, OnDestroy {
  public showNavigation: boolean;
  public mobileQuery: MediaQueryList;
  public currentPage: string;
  private navigationSubscription: Subscription;

  private readonly mobileQueryListener: () => void;

  constructor(private userService: UserService, private router: Router, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef,
              private navigationService: NavigationService) {
    this.showNavigation = userService.sessionIsActive();
    this.router.events.subscribe(() => this.showNavigation = userService.sessionIsActive());
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);

    this.navigationSubscription = this.navigationService.getTitle().subscribe(title => {
      this.currentPage = title;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    this.navigationSubscription.unsubscribe();
  }

  public sideNavMode() {
    // return this.mobileQuery.matches ? 'over' : 'side';
    return 'over';
  }

}
