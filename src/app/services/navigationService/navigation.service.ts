import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private subject = new Subject<any>();

  constructor(private router: Router) {
  }

  displayTitle(title: string) {
    this.subject.next(title);
  }

  getTitle(): Observable<any> {
    return this.subject.asObservable();
  }

  clear(): void {
    this.subject.next();
  }
}
