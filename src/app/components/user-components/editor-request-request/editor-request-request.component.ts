import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/userService/user.service';
import {LoggerService} from '../../../services/shared/logger.service';
import {Router} from '@angular/router';
import {RequestService} from '../../../services/requestService/request.service';
import {HttpErrorResponse} from '@angular/common/http';
import {WorkflowDisplayComponent} from '../../common/workflow-display/workflow-display.component';
import {RequestModel} from '../../../model/EditorRequest/EditorRequest.model';
import {PermissionService} from '../../../services/permissionService/permission.service';

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
  editorRequest: RequestModel;
  @ViewChild(WorkflowDisplayComponent, { static: false }) workflowDisplayComponent: WorkflowDisplayComponent;


  constructor(private logger: LoggerService, private requestService: RequestService, private userService: UserService,
              private router: Router, private formBuilder: FormBuilder, private permissionService: PermissionService) {
  }

  public form() {
    return this.editorRequestForm.controls;
  }

  ngOnInit() {
    this.editorRequestForm = this.formBuilder.group({
      description: ['']
    });

    this.retrieveDataAndLoadConfig();

    if (this.editorRequest && this.editorRequest.approved) {
      this.permissionService.addEditorRol();
    }
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
      });
  }

  onSubmit() {
    if (this.editorRequestForm.get('description').valid) {
      if (this.editorRequest == null || this.editorRequest.closed) {
        this.requestService.createEditorRequest(this.editorRequestForm.get('description').value)
          .then(() => {
            this.retrieveDataAndLoadConfig();
            this.editorRequestForm.reset();
          })
          .catch();
      } else {
        this.requestService.updateEditorRequest(this.editorRequestForm.get('description').value)
          .then(() => {
            this.retrieveDataAndLoadConfig();
            this.editorRequestForm.reset();
          })
          .catch();
      }
    }
  }

}
