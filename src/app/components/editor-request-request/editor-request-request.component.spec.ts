import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorRequestRequestComponent } from './editor-request-request.component';

describe('EditorRequestRequestComponent', () => {
  let component: EditorRequestRequestComponent;
  let fixture: ComponentFixture<EditorRequestRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorRequestRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorRequestRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
