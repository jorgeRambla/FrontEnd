import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  success(message: string, referencedId = 0, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'success', text: message, id: referencedId});
  }

  error(message: string, referencedId = 0, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'error', text: message, id: referencedId});
  }

  info(message: string, referencedId = 0, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'info', text: message, id: referencedId});
  }

  warning(message: string, referencedId = 0, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'warning', text: message, id: referencedId});
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  clear(referencedId = 0): void {
    this.subject.next({id: referencedId, clear: true});
  }
}
