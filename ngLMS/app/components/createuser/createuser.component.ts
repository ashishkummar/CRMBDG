import { Component, OnInit } from '@angular/core';
import {
    ReactiveFormsModule,
    AbstractControl,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
import { SideBarService, UserService, AlertService } from '../../services/index'
import { IUser } from './IUser'
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
    selector: 'createUser',
    templateUrl: './createuser.component.html',
    styleUrls: ['./createuser.component.css']
})

export class CreateUserComponent implements OnInit, OnDestroy {

    myform: FormGroup;
    passMessage: any;
    ActiveUsers: any;
    selecteduser: any;
    actBtnText: string = 'Create';
    isLoading = false;  
    
    userobj: IUser = {
        ID: 0,
        Name: '',
        Contact: '',
        email: '',
        Password: '',
        UserID: ''
    };

    constructor(private fb: FormBuilder
        , private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService

    ) {
        this.LoadAllUser();
    }
    ngOnInit() {
        this.sideBarService.setPageTitle('User Management');

        this.myform = this.fb.group({
            ID: [0],
            name: ['', [Validators.required, Validators.maxLength(25)]],
            userID: ['', [Validators.required, Validators.minLength(4)]],
            passGroup: this.fb.group({
                password: ['', [
                    Validators.required,
                    Validators.minLength(4)
                ]],
                rePassword: '',
            }, { validator: this.passmatcher }),
            email: ['', [
                Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")
            ]],
            contact: ['', [Validators.minLength(10), Validators.maxLength(13)]]

        });
    }
    ngOnDestroy() {

    }
    passmatcher(c: AbstractControl) {

        let pass = c.get('password');
        let repass = c.get('rePassword');
        if (pass && repass) {
            if (pass.pristine || repass.pristine) {
                return null;
            }
            if (pass.value === repass.value) {
                return null;
            }
        }
        return { 'notMatch': true };
    }

    LoadAllUser() {
        this.isLoading = true;
        this.user.getAllUsers().subscribe(
            data => {
                this.ActiveUsers = JSON.parse(data);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });

    }

    SelectUser(id: string) {
        this.isLoading = true;
        this.user.getUserByID(id).subscribe(
            data => {

                this.selecteduser = JSON.parse(data);
                this.myform.patchValue({
                    ID: this.selecteduser.id,
                    name: this.selecteduser.name,
                    userID: this.selecteduser.userID,
                    email: this.selecteduser.email,
                    contact: this.selecteduser.contact,
                    passGroup: {
                        password: this.selecteduser.password,
                        rePassword: this.selecteduser.password
                    }
                });
                this.actBtnText = 'Update';
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });

    }

    ClearForm() {
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
        })
        this.actBtnText = 'Create';
    }

    insertUpdateUser() {
        this.isLoading = true;
        this.user.insUptUser(this.getFormData()).subscribe(data => {
            this.ActiveUsers = JSON.parse(data);
            this.isLoading = false;
            this.alert.success('User inserted or updated Successfully.', 3000);
        },
            error => {
                this.alert.error(error, 5000);
                this.isLoading = false;
            });

    }

    DeleteForm() {
        this.isLoading = true;
        this.user.deleteUser(this.getFormData()).subscribe(data => {
            this.ActiveUsers = JSON.parse(data);
            this.ClearForm();
            this.isLoading = false;
            this.alert.success('User deleted Successfully.', 3000);
        },
            error => {
                this.alert.error(error, 5000);
                this.isLoading = false;
            });
    }

    getFormData(): IUser {
        this.userobj.ID = this.myform.controls['ID'].value || 0;
        this.userobj.Name = this.myform.controls['name'].value;
        this.userobj.UserID = this.myform.controls['userID'].value;
        this.userobj.email = this.myform.controls['email'].value;
        this.userobj.Contact = this.myform.controls['contact'].value;
        this.userobj.Password = this.myform.controls['passGroup'].value.password;
        return this.userobj;
    }
}

