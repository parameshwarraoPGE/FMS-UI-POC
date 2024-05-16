import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordResetComponent } from './password-reset/password-reset.component';

export const USER_IMPORT = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule.forChild([
    { path: 'sign-up', component: SignupComponent },
    { path: 'pwd-reset', component: PasswordResetComponent }
  ])
];


export const USER_DIRECTIVES = [
  LoginComponent,
  SignupComponent,
  PasswordResetComponent
];


@NgModule({
  declarations: USER_DIRECTIVES,
  imports: USER_IMPORT,
  exports: USER_DIRECTIVES
})
export class UserModule { }
