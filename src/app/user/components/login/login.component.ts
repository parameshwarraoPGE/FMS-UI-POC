import { Component, OnInit } from '@angular/core';
import {FileManagementService} from '../../../shared/service/file-management.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username:string ="";
  public password:string ="";
  public passwordShow:boolean = false;
  public isPasswordError:boolean = false;
  public errorMessage:string ="";
  

  constructor(private _EmployeeService:FileManagementService, private _router : Router) { }

  ngOnInit(): void {
    let authToken = sessionStorage.getItem('authToken');
    if(authToken){
      this._router.navigate(['/List']);
    }
  }
  

  public submitHandler(){
   
    this._EmployeeService.userLogin(this.username,this.password).subscribe({
      next: (data)=>{
        if(data.token){
          //set auth token here
          sessionStorage.setItem('authToken',data.token); 
          this._EmployeeService.userAuthenicationStats.next({
            hasAuthenticationCheck:false,
            isAuthenticated:true
          });         
          this._router.navigate(['/List']);
        }

      },
      error: (err)=>{
        this.isPasswordError = true;

        let {error} = err;
        if(error && error.errors){
          this.errorMessage = error.errors[0] ? error.errors[0].msg : "some error";
        }
      }
    });
  }

  public signUpButtonHandler(){
    this._router.navigate(['/sign-up']);
  }

  public forgotPwdHandler(){
    this._router.navigate(['/pwd-reset']);

   }

  

}
