import { Component, OnInit } from '@angular/core';
import {
    ReactiveFormsModule,
    AbstractControl,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
import { AuthenticationService } from '../../authGaurd/index';
import { UserService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    errorMsg = '';
    isLoading = false;
    constructor(private fb: FormBuilder
        , private auth: AuthenticationService
        , private router: Router
        , private userService: UserService

    ) {

    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            userID: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    login() {
        this.errorMsg = '';
       
        if (this.loginForm.controls['userID'].value == '' || this.loginForm.controls['password'].value == '') {
            this.errorMsg = 'Required field missing';
            return;
        }
        this.loading = true;
        this.isLoading = true;
        this.auth.login(this.loginForm.controls['userID'].value, this.loginForm.controls['password'].value)
            .subscribe(
            data => {
                this.getUserInfo();
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
                this.isLoading = false;
            });

    }

    getUserInfo() {
        this.userService.getLoginUserDtl(this.loginForm.controls['userID'].value)
            .subscribe(
            data => {
                this.isLoading = false;
                this.router.navigate(['/leads/leadManager']);
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
                this.isLoading = false;
            });
    }

}
