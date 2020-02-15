import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavNavComponent } from './sidenav-nav.component';

describe('SidenavNavComponent', () => {
  let component: SidenavNavComponent;
  let fixture: ComponentFixture<SidenavNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
