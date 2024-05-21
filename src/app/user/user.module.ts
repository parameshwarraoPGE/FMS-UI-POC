import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './pages/user-page/user-page.component';

export const USER_IMPORT = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  UserRoutingModule
];


export const USER_DIRECTIVES = [
  UserPageComponent,
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
