import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError, forkJoin, BehaviorSubject } from 'rxjs';
import { userRequestBody, authenicationStatus } from '../models/user.model';
import { createEmployeeReqbody, BatchListRequest, updateEmployeeReqBody } from '../models/file.model';



@Injectable({
  providedIn: 'root'
})
export class FileManagementService {

  //flag to check if user authenticated
  public isUserAuthenticated: boolean = false;
  public userName: string = "";
  baseURL: string = `${environment.backendOrigin}/`;
  authToken: string = "";
  loginURL: string = "api/auth";
  signUpURL: string = "api/users";
  userExistURL: string = "api/auth/userExist";
  updatePasswordURL: string = "api/auth/updatePassword";
  
  

  batchListURL: string = "api/batchFile/List";
  createEmployeeURL: string = "api/employee/CreateEmployee";
  employeeDetailURL: string = "api/employee/employeeDetail";
  updateEmployeeURL: string = "api/employee/updateEmployee";
  removeEmployeeURL: string = "api/employee/RemoveEmployee";

  getAllDepartmentOptionURL: string = "api/employee/DepartmentOptions";
  getAllBussinessOptionURL: string = "api/employee/BussinessUnitOptions";
  getAllCountryOptionURL: string = "api/employee/CountryOptions";
  getallCityOptionsURL: string = "api/employee/CityOptions";
  getallGenderOptionsURL: string = "api/employee/GenderOptions";
  getallEthnicityOptionsURL: string = "api/employee/EthnicityOptions";

 

  public userAuthenicationStats: BehaviorSubject<authenicationStatus> = new BehaviorSubject<authenicationStatus>({
    hasAuthenticationCheck:false,
    isAuthenticated:false
  });

 




  constructor(private _httpClient: HttpClient) {

   }

  

  getHttpUrl(urlSegment: string): string {
    return `${this.baseURL}${urlSegment}`;
  }

  //error handler
  public errorHandler(errorResponse: HttpErrorResponse) {
    return throwError(() => errorResponse);
  }

  public userLogin(userName: string = "", userPassword: string = ""): Observable<any> {
    let url: string = this.getHttpUrl(this.loginURL);
    return this._httpClient.post(url, {
      email: userName,
      password: userPassword
    }).pipe(catchError(this.errorHandler));
  }

  public signUpUsers(userDetails: userRequestBody): Observable<any> {
    let url: string = this.getHttpUrl(this.signUpURL);
    return this._httpClient.post(url, userDetails).pipe(catchError(this.errorHandler));
  }

  public validateUser(useEmail: string = "", appSecertKey: string = ""): Observable<any> {
    let url: string = this.getHttpUrl(this.userExistURL);
    return this._httpClient.post(url, {
      email: useEmail,
      secertKey: appSecertKey
    }).pipe(catchError(this.errorHandler));
  }

  public changeUserPassword(userReferenceID: string = "", updatedPassword: string = ""): Observable<any> {
    let url: string = this.getHttpUrl(this.updatePasswordURL);
    return this._httpClient.post(url, {
      _id: userReferenceID,
      updatedPassword: updatedPassword
    }).pipe(catchError(this.errorHandler));
  }

  //employee
  public getBatchList(batchListRequest: BatchListRequest): Observable<any> {
    let url: string = this.getHttpUrl(this.batchListURL);
    return this._httpClient.post(url, batchListRequest).pipe(catchError(this.errorHandler));
  }

  public getEmployeeDetail(userReferenceID: string = ""): Observable<any> {
    let url: string = this.getHttpUrl(this.employeeDetailURL);
    url = `${url}/${userReferenceID}`;
    return this._httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  public createEmployee(newEmployeeReq: createEmployeeReqbody): Observable<any> {
    let url: string = this.getHttpUrl(this.createEmployeeURL);
    return this._httpClient.post(url, newEmployeeReq).pipe(catchError(this.errorHandler));
  }

  public updateEmployee(updateEmployeeReq: updateEmployeeReqBody): Observable<any> {
    let url: string = this.getHttpUrl(this.updateEmployeeURL);
    return this._httpClient.put(url, updateEmployeeReq).pipe(catchError(this.errorHandler));
  }

  public deleteEmployee(employeeObjectid: string = ""): Observable<any> {
    let url: string = this.getHttpUrl(this.removeEmployeeURL);
    url = `${url}/${employeeObjectid}`;
    return this._httpClient.delete(url).pipe(catchError(this.errorHandler));
  }



  

}
