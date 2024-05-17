import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FileManagementService } from './file-management.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuardService implements CanActivate {

  constructor(private _router: Router, private _EmployeeService:FileManagementService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
   let authToken = sessionStorage.getItem('authToken');
   if(authToken){
    this._EmployeeService.isUserAuthenticated = true;    
    return true;
   }
   this._EmployeeService.isUserAuthenticated = false;   
   this._router.navigate(['/']);   
   return false;
  }
}
