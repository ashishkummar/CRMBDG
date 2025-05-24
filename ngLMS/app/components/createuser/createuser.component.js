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
var CreateUserComponent = /** @class */ (function () {
    function CreateUserComponent(fb, sideBarService, user, alert) {
        this.fb = fb;
        this.sideBarService = sideBarService;
        this.user = user;
        this.alert = alert;
        this.actBtnText = 'Create';
        this.isLoading = false;
        this.userobj = {
            ID: 0,
            Name: '',
            Contact: '',
            email: '',
            Password: '',
            UserID: ''
        };
        this.LoadAllUser();
    }
    CreateUserComponent.prototype.ngOnInit = function () {
        this.sideBarService.setPageTitle('User Management');
        this.myform = this.fb.group({
            ID: [0],
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(25)]],
            userID: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4)]],
            passGroup: this.fb.group({
                password: ['', [
                        forms_1.Validators.required,
                        forms_1.Validators.minLength(4)
                    ]],
                rePassword: '',
            }, { validator: this.passmatcher }),
            email: ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")
                ]],
            contact: ['', [forms_1.Validators.minLength(10), forms_1.Validators.maxLength(13)]]
        });
    };
    CreateUserComponent.prototype.ngOnDestroy = function () {
    };
    CreateUserComponent.prototype.passmatcher = function (c) {
        var pass = c.get('password');
        var repass = c.get('rePassword');
        if (pass && repass) {
            if (pass.pristine || repass.pristine) {
                return null;
            }
            if (pass.value === repass.value) {
                return null;
            }
        }
        return { 'notMatch': true };
    };
    CreateUserComponent.prototype.LoadAllUser = function () {
        var _this = this;
        this.isLoading = true;
        this.user.getAllUsers().subscribe(function (data) {
            _this.ActiveUsers = JSON.parse(data);
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error);
        });
    };
    CreateUserComponent.prototype.SelectUser = function (id) {
        var _this = this;
        this.isLoading = true;
        this.user.getUserByID(id).subscribe(function (data) {
            _this.selecteduser = JSON.parse(data);
            _this.myform.patchValue({
                ID: _this.selecteduser.id,
                name: _this.selecteduser.name,
                userID: _this.selecteduser.userID,
                email: _this.selecteduser.email,
                contact: _this.selecteduser.contact,
                passGroup: {
                    password: _this.selecteduser.password,
                    rePassword: _this.selecteduser.password
                }
            });
            _this.actBtnText = 'Update';
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error);
        });
    };
    CreateUserComponent.prototype.ClearForm = function () {
        this.myform.reset({
            ID: 0,
            name: '',
            userID: '',
            email: '',
            contact: '',
            passGroup: {
                password: '',
                rePassword: ''
            }
        });
        this.actBtnText = 'Create';
    };
    CreateUserComponent.prototype.insertUpdateUser = function () {
        var _this = this;
        this.isLoading = true;
        this.user.insUptUser(this.getFormData()).subscribe(function (data) {
            _this.ActiveUsers = JSON.parse(data);
            _this.isLoading = false;
            _this.alert.success('User inserted or updated Successfully.', 3000);
        }, function (error) {
            _this.alert.error(error);
            _this.isLoading = false;
        });
    };
    CreateUserComponent.prototype.DeleteForm = function () {
        var _this = this;
        this.isLoading = true;
        this.user.deleteUser(this.getFormData()).subscribe(function (data) {
            _this.ActiveUsers = JSON.parse(data);
            _this.ClearForm();
            _this.isLoading = false;
            _this.alert.success('User deleted Successfully.', 3000);
        }, function (error) {
            _this.alert.error(error);
            _this.isLoading = false;
        });
    };
    CreateUserComponent.prototype.getFormData = function () {
        this.userobj.ID = this.myform.controls['ID'].value || 0;
        this.userobj.Name = this.myform.controls['name'].value;
        this.userobj.UserID = this.myform.controls['userID'].value;
        this.userobj.email = this.myform.controls['email'].value;
        this.userobj.Contact = this.myform.controls['contact'].value;
        this.userobj.Password = this.myform.controls['passGroup'].value.password;
        return this.userobj;
    };
    CreateUserComponent = __decorate([
        core_1.Component({
            selector: 'createUser',
            templateUrl: './createuser.component.html',
            styleUrls: ['./createuser.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            index_1.SideBarService,
            index_1.UserService,
            index_1.AlertService])
    ], CreateUserComponent);
    return CreateUserComponent;
}());
exports.CreateUserComponent = CreateUserComponent;
