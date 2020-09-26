import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyQuestionsComponent } from './view-my-questions.component';

describe('ViewMyQuestionsComponent', () => {
  let component: ViewMyQuestionsComponent;
  let fixture: ComponentFixture<ViewMyQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
