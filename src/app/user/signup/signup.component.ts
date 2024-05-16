import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userRequestBody } from '../../shared/models/user.model';
import { EmployeeService } from '../../shared/service/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public passwordShow: boolean = false;
  public errorMessage: string = "";
  signupForm: UntypedFormGroup = new UntypedFormGroup({});
  isError:boolean = false;
  constructor(
    private _FormBuilder: UntypedFormBuilder,
    private _router: Router,
    private _EmployeeService: EmployeeService) { }

  ngOnInit(): void {
    this.signupForm = this._FormBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  public inputboxValidation(formControlName: string): boolean {
    if (
      (this.signupForm.get(formControlName)?.dirty || this.signupForm.get(formControlName)?.touched) &&
      this.signupForm.get(formControlName)?.errors
    ) {
      return true;

    } else {
      return false;
    }
  }

  createUser() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      let userdetails: userRequestBody = new userRequestBody();
      userdetails = <userRequestBody>this.signupForm.value;

      this._EmployeeService.signUpUsers(userdetails).subscribe({
        next: (data) => {
          if (data.token) {
            //set auth token here
            sessionStorage.setItem('authToken', data.token); 
            this._EmployeeService.userAuthenicationStats.next({
              hasAuthenticationCheck:false,
              isAuthenticated:true
            });           
            this._router.navigate(['/List']);
          }

        },
        error: (err) => {
          this.isError = true;
          let { error } = err;
          if (error && error.errors) {
            this.errorMessage = error.errors[0] ? error.errors[0].msg : "some error";
          }
        }
      });

    }


  }

  redirectToSignIn() {
    this._router.navigate(['/login']);
  }

}
