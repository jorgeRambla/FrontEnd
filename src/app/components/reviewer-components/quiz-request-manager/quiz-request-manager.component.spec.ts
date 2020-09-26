import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRequestManagerComponent } from './quiz-request-manager.component';

describe('GameComponentsRequestManagerComponent', () => {
  let component: QuizRequestManagerComponent;
  let fixture: ComponentFixture<QuizRequestManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizRequestManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRequestManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
