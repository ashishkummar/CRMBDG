import {
    Component, Input, OnInit, Output, EventEmitter
} from '@angular/core';
import {
    ReactiveFormsModule,
    AbstractControl,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormsModule
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { Message } from 'primeng/api';

import { SideBarService, UserService, AlertService, ProjectService } from '../../services/index'

import { AuthenticationService } from '../../authGaurd/index'
import { IProject } from './IProject'

@Component({
    selector: 'create-project',
    templateUrl: './createProject.component.html',
    styleUrls: ['./createProject.component.css']
})

export class CreateProjectComponent implements OnInit {

    @Output() onSaveClick: EventEmitter<any> = new EventEmitter();

    popMsg: Message[] = [];
    isLoading = false;
    createLead: FormGroup;
    uploadedFileName = '';
     
    selectedProject: IProject = {
        Project_ID: 0,
        Project_Location: '',
        Project_Name: '',
        Project_Type: '',
        Project_URL: '',
        Project_DOE: new Date(),
        Project_Updated: new Date(),
        Project_File: ''
    }

    constructor(
         private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService
        , private authenticationService: AuthenticationService
        , private fb: FormBuilder
        , private projectService: ProjectService
    ) {

        this.createLead = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(25)]],
            projectType: ['', [Validators.required]],
            projectUrl: ['', [Validators.required]],
            projectLocation: ['', [Validators.required]],

        });

    }
    ngOnInit() {

    }

    insertLead() {
        if (this.createLead.valid) {
            if (this.uploadedFileName == '') {
                this.alert.error('Please select a file to upload', 5000);
                return;
            }
            this.selectedProject.Project_ID = 0;
            this.selectedProject.Project_Name = this.createLead.controls['name'].value;
            this.selectedProject.Project_Type = this.createLead.controls['projectType'].value;
            this.selectedProject.Project_Location = this.createLead.controls['projectLocation'].value;
            this.selectedProject.Project_URL = this.createLead.controls['projectUrl'].value;
            this.selectedProject.Project_File = '/ProjectFiles/' + this.uploadedFileName;
            this.onSaveClick.emit([this.selectedProject]);
        }
    }

    fileChange(event) {
        
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.isLoading = true;
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            this.projectService.uploadProject(formData).subscribe(
                data => {
                    this.isLoading = false;
                    this.uploadedFileName = data.substr(1).slice(0, -1);
                    if (this.uploadedFileName == '') {
                        this.alert.error('Error while uploading file', 5000);
                    }
                },
                error => {
                    this.isLoading = false;
                    this.alert.error(error, 5000);
                });
        }
    }

} 