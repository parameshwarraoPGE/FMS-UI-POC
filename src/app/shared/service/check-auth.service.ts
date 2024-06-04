import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FileManagementService } from './file-management.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuardService implements CanActivate {

  constructor(private _router: Router, private fileManagementService:FileManagementService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
   let authToken = sessionStorage.getItem('authToken');
   if(authToken){
    this.fileManagementService.isUserAuthenticated = true;    
    return true;
   }
   this.fileManagementService.isUserAuthenticated = false;   
   this._router.navigate(['/']);   
   return false;
  }
}
