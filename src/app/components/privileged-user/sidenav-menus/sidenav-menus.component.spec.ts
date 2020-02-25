import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMenusComponent } from './sidenav-menus.component';

describe('SidenavMenusComponent', () => {
  let component: SidenavMenusComponent;
  let fixture: ComponentFixture<SidenavMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
