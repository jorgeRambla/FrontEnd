import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorRequestManageComponent } from './editor-request-manage.component';

describe('EditorRequestManageComponent', () => {
  let component: EditorRequestManageComponent;
  let fixture: ComponentFixture<EditorRequestManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorRequestManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorRequestManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
