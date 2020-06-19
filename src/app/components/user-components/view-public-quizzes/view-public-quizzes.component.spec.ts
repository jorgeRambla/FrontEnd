import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublicQuizzesComponent } from './view-public-quizzes.component';

describe('ViewPublicQuizzesComponent', () => {
  let component: ViewPublicQuizzesComponent;
  let fixture: ComponentFixture<ViewPublicQuizzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPublicQuizzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPublicQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
