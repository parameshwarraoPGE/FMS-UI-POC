import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError, forkJoin, BehaviorSubject } from 'rxjs';
import { userRequestBody, authenicationStatus } from '../models/user.model';
import {  BatchListRequest } from '../models/file.model';



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
  fileUploadURL:string ="api/batchFile/uploadFile";

  getBatchFileURL:string = "api/batchFile/singleFileDownload";



  createBatchURL: string = "api/batchFile/CreateBatch";
  getBatchDetailsURL: string = "api/batchFile/batchFileDetail";  
  deleteBatchURL: string = "api/batchFile/deleteBatch";

  

 

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

  public getBatchDetail(batchId: string = ""): Observable<any> {
    let url: string = this.getHttpUrl(this.getBatchDetailsURL);
    url = `${url}/${batchId}`;
    return this._httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  public createBatch(newBatchName: string): Observable<any> {
    let url: string = this.getHttpUrl(this.createBatchURL);
    return this._httpClient.post(url, {
      batchName : newBatchName
    }).pipe(catchError(this.errorHandler));
  }


  public deleteBatch(batchId: string = ""): Observable<any> {
    let url: string = this.getHttpUrl(this.deleteBatchURL);
    url = `${url}/${batchId}`;
    return this._httpClient.delete(url).pipe(catchError(this.errorHandler));
  }

  //files
   /**
   * This upload files to GCP storage. we are using rxjs forkjoin to make multiple calls and upload files
   * simultaneously
   * @param id :- this is sub folder directory in GCP firebase storage
   * @returns 
   */

   public uploadFiles(id: string, filesToUpload: Array<File>): Observable<any> {
    let url: string = this.getHttpUrl(this.fileUploadURL);

    let allRequestObservables = [];

    for (let file of filesToUpload) {
      // Create form data
      const formData = new FormData();

      // Store form name as "file" with file data
      formData.append("uploadfiles", file, file.name);

      //set headers for reference
      let headersToSend = new HttpHeaders({filePath:id});


      //push the observables in master list    
      allRequestObservables.push(this._httpClient.post(url, formData,{
        headers:headersToSend,
        reportProgress: true,
        observe: 'events'}).pipe(catchError(this.errorHandler)));
    }

    return forkJoin(allRequestObservables);
  }



public getBatchFile(id: string, fileName: string): Observable<any> {
  let url: string = this.getHttpUrl(this.getBatchFileURL);
  return this._httpClient.post(url, {
    batchId: id,
    fileName: fileName
  },{ reportProgress: true, observe: 'response' , responseType: 'blob'}).pipe(catchError(this.errorHandler));
}



  

}
