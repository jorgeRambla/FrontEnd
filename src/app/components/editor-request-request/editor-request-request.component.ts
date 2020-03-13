import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/userService/user.service';
import {LoggerService} from '../../services/shared/logger.service';
import {Router} from '@angular/router';
import {RequestService} from '../../services/requestService/request.service';
import {HttpErrorResponse} from '@angular/common/http';
import {EditorRequestModel} from '../../model/EditorRequest/EditorRequest.model';
import {WorkflowDisplayComponent} from '../common/workflow-display/workflow-display.component';

@Component({
  selector: 'app-editor-request-request',
  templateUrl: './editor-request-request.component.html',
  styleUrls: ['./editor-request-request.component.scss']
})
export class EditorRequestRequestComponent implements OnInit {
  editorRequestForm: FormGroup;
  existsPreviousRequest: boolean;
  previousRequestIsClosed: boolean;
  previousRequestIsApproved: boolean;
  editorRequest: EditorRequestModel;
  @ViewChild(WorkflowDisplayComponent, { static: false }) childC: WorkflowDisplayComponent;


  constructor(private logger: LoggerService, private requestService: RequestService, private userService: UserService,
              private router: Router, private formBuilder: FormBuilder) {
  }

  public form() {
    return this.editorRequestForm.controls;
  }

  ngOnInit() {
    this.editorRequestForm = this.formBuilder.group({
      description: ['']
    });

    this.retrieveDataAndLoadConfig();
  }

  private retrieveDataAndLoadConfig(): void {
    this.requestService.getCurrentUserEditorRequest()
      .then(data => {
        this.existsPreviousRequest = true;
        this.previousRequestIsClosed = data.closed;
        this.previousRequestIsApproved = data.approved;
        this.editorRequest = data;
      })
      .catch(error => {
        const httpErrorResponse = error as HttpErrorResponse;
        if (httpErrorResponse.status === 404) {
          this.existsPreviousRequest = false;
        }
        this.userService.checkUserIsAuthorized(httpErrorResponse);
      });
  }

  onSubmit() {
    if (this.editorRequestForm.get('description').valid) {
      if (this.editorRequest == null || this.editorRequest.closed) {
        this.requestService.createEditorRequest(this.editorRequestForm.get('description').value)
          .then(() => {
            this.ngOnInit();
          })
          .catch();
      } else {
        this.requestService.updateEditorRequest(this.editorRequestForm.get('description').value)
          .then(() => {
            this.ngOnInit()
          })
          .catch();
      }
    }
  }

}
