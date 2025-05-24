"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var index_1 = require("../../services/index");
var index_2 = require("../../authGaurd/index");
var CreateProjectComponent = /** @class */ (function () {
    function CreateProjectComponent(sideBarService, user, alert, authenticationService, fb, projectService) {
        this.sideBarService = sideBarService;
        this.user = user;
        this.alert = alert;
        this.authenticationService = authenticationService;
        this.fb = fb;
        this.projectService = projectService;
        this.onSaveClick = new core_1.EventEmitter();
        this.popMsg = [];
        this.isLoading = false;
        this.uploadedFileName = '';
        this.selectedProject = {
            Project_ID: 0,
            Project_Location: '',
            Project_Name: '',
            Project_Type: '',
            Project_URL: '',
            Project_DOE: new Date(),
            Project_Updated: new Date(),
            Project_File: ''
        };
        this.createLead = this.fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(25)]],
            projectType: ['', [forms_1.Validators.required]],
            projectUrl: ['', [forms_1.Validators.required]],
            projectLocation: ['', [forms_1.Validators.required]],
        });
    }
    CreateProjectComponent.prototype.ngOnInit = function () {
    };
    CreateProjectComponent.prototype.insertLead = function () {
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
    };
    CreateProjectComponent.prototype.fileChange = function (event) {
        var _this = this;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            this.isLoading = true;
            var file = fileList[0];
            var formData = new FormData();
            formData.append('uploadFile', file, file.name);
            this.projectService.uploadProject(formData).subscribe(function (data) {
                _this.isLoading = false;
                _this.uploadedFileName = data.substr(1).slice(0, -1);
                if (_this.uploadedFileName == '') {
                    _this.alert.error('Error while uploading file', 0);
                }
            }, function (error) {
                _this.isLoading = false;
                _this.alert.error(error, 0);
            });
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CreateProjectComponent.prototype, "onSaveClick", void 0);
    CreateProjectComponent = __decorate([
        core_1.Component({
            selector: 'create-project',
            templateUrl: './createProject.component.html',
            styleUrls: ['./createProject.component.css']
        }),
        __metadata("design:paramtypes", [index_1.SideBarService,
            index_1.UserService,
            index_1.AlertService,
            index_2.AuthenticationService,
            forms_1.FormBuilder,
            index_1.ProjectService])
    ], CreateProjectComponent);
    return CreateProjectComponent;
}());
exports.CreateProjectComponent = CreateProjectComponent;
