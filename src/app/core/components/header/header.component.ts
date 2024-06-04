import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileManagementService } from '../../../shared/service/file-management.service';

@Component({
  selector: 'app-header',  
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router : Router, public fileManagementService:FileManagementService, ){

  }

  public redirectToPasswordReset(){
    this.router.navigate(['user/pwd-reset']);
  }
  public logOff(){
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

}
