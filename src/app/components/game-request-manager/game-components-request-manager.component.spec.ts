import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponentsRequestManagerComponent } from './game-components-request-manager.component';

describe('GameComponentsRequestManagerComponent', () => {
  let component: GameComponentsRequestManagerComponent;
  let fixture: ComponentFixture<GameComponentsRequestManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponentsRequestManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponentsRequestManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
