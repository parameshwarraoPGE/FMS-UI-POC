import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileManagementService } from '../../shared/service/file-management.service';
import { userExistResponse } from '../../shared/models/user.model';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  

  //flag to see if user is autenticated
  isUserAuthenticated:boolean = false;
  authenticatedUserResponse:userExistResponse = new userExistResponse();

  public passwordShow: boolean = false;
  public errorMessage: string = "";
  //one form user validation
  userValidationForm: UntypedFormGroup = new UntypedFormGroup({});
  //to hold new password
  newPasswordForm: UntypedFormGroup = new UntypedFormGroup({});
  isError:boolean = false;

  updatedInfo:string ="";

  //flag to see user has already signed in or not
  get hasUserLoggedin(){
    return this.fileManagementService.isUserAuthenticated;

  }

  constructor(private untypedFormBuilder: UntypedFormBuilder,
    private router: Router,
    private fileManagementService: FileManagementService) { }

  ngOnInit(): void {
    this.userValidationForm = this.untypedFormBuilder.group({      
      email: ['', [Validators.required, Validators.email]],
      secertKey: ['', Validators.required]
    });
    this.newPasswordForm = this.untypedFormBuilder.group({     
      updatedPassword: ['', Validators.required]
    });
  }

  public userFormValidationHandler (formControlName: string): boolean {
    if (
      (this.userValidationForm.get(formControlName)?.dirty || this.userValidationForm.get(formControlName)?.touched) &&
      this.userValidationForm.get(formControlName)?.errors
    ) {
      return true;

    } else {
      return false;
    }
  }

  public newPasswordValidationHandler (formControlName: string): boolean {
    if (
      (this.newPasswordForm.get(formControlName)?.dirty || this.newPasswordForm.get(formControlName)?.touched) &&
      this.newPasswordForm.get(formControlName)?.errors
    ) {
      return true;

    } else {
      return false;
    }
  }

  validateUser(){
    if(this.userValidationForm.valid){
      //make api call
      let formvalue = this.userValidationForm.value;
      let {email,secertKey} = formvalue;
       this.fileManagementService.validateUser(email,secertKey).subscribe({
        next:(data)=>{
          this.isError = false;
          this.authenticatedUserResponse = <userExistResponse>data;
          sessionStorage.setItem('authToken',this.authenticatedUserResponse.authtoken);
          this.isUserAuthenticated = true;

        },
        error:(err)=>{
          this.isError = true;
          let { error } = err;
          if (error && error.errors) {
            this.errorMessage = error.errors[0] ? error.errors[0].msg : "some error";
          }

        }
       });

    }

  }

  submitNewPassword(){
    if(this.newPasswordForm.valid){
      let formVal = this.newPasswordForm.value;
      let {updatedPassword } =formVal;
      this.fileManagementService.changeUserPassword(this.authenticatedUserResponse.userData._id,updatedPassword).subscribe({
        next:(data)=>{
          this.isError = false;
          this.updatedInfo = data.message;
          setTimeout(() => {
            this.router.navigate(['/List']);
          },1000);

        },
        error:(err)=>{
          this.isError = true;
          let { error } = err;
          if (error && error.errors) {
            this.errorMessage = error.errors[0] ? error.errors[0].msg : "some error";
          }

        }
       });
    }

  }

  redirectToSignup(){
    this.router.navigate(['/sign-up']);
  }

}
