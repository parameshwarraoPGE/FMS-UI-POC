import { Component, OnInit } from '@angular/core';
import {FileManagementService} from '../../../shared/service/file-management.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  

  constructor(
    private fileManagementService:FileManagementService, 
    private router : Router, 
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    let authToken = sessionStorage.getItem('authToken');
    if(authToken){
      this.router.navigate(['batch/List']);
    }
  }
  

  public submitHandler(){
   
    this.fileManagementService.userLogin(this.username,this.password).subscribe({
      next: (data)=>{
        if(data.token){
          //set auth token here
          sessionStorage.setItem('authToken',data.token); 
          this.fileManagementService.userAuthenicationStats.next({
            hasAuthenticationCheck:false,
            isAuthenticated:true
          });         
          this.router.navigate(['./batch/List']);
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
    this.router.navigate(['../sign-up'], {relativeTo: this.activatedRoute});
  }

  public forgotPwdHandler(){
    this.router.navigate(['../pwd-reset'],{relativeTo: this.activatedRoute });

   }

  

}
