import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyQuizzesComponent } from './view-my-quizzes.component';

describe('ViewMyQuizzesComponent', () => {
  let component: ViewMyQuizzesComponent;
  let fixture: ComponentFixture<ViewMyQuizzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyQuizzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
