import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../../shared/service/employee.service';
import { detailResponse, employeeObject } from '../../shared/models/employee.model';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { UntypedFormBuilder } from '@angular/forms';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public isError: boolean = false;

  public deleteMessageInfo: string = "";
  public deleteErrorMessage: string = "";

  public enableEdit: boolean = false;

  public id: string = "";

  @ViewChild('createEmpRef', { static: false }) _createEmployeeRef: CreateEmployeeComponent = new CreateEmployeeComponent(this._FormBuilder,
    this._router,
    this._EmployeeService);

  @ViewChild('deleteModal', { static: false }) deleteModalRef: ElementRef<any> = {} as ElementRef;

  employeeDetail: detailResponse = new detailResponse();
  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _EmployeeService: EmployeeService,
    private _FormBuilder: UntypedFormBuilder) {

  }
  ngAfterViewChecked(): void {

  }
  ngAfterViewInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.getEmployeeDetails(params['id']);
      }
    });
  }
  getEmployeeDetails(id: string = "") {
    this._EmployeeService.getEmployeeDetail(id).subscribe({
      next: (data) => {
        this.isError = false;
        this.employeeDetail = data;
      },
      error: (err) => {
        this.isError = true;

      }
    });
  }

  ngOnInit(): void {
  }

  goBack() {
    this._location.back();
  }

  deleteEmployee() {
    this.showDeleteModal();
  }

  updateEmployee() {
    this.enableEdit = true;
    let employeeDat = <employeeObject>this.employeeDetail;
    setTimeout(() => {
      this._createEmployeeRef.updateFormForEdit(employeeDat);
    });

  }

  updateEmployeeHandler($event: any) {
    this.enableEdit = false;
    this.getEmployeeDetails(this.id);

  }

  confirmClose(deleteStatus: boolean) {

    if (deleteStatus) {
      this._EmployeeService.deleteEmployee(this.employeeDetail._id).subscribe({
        next: (data) => {
          this.closeDeleteModal();
          this.deleteMessageInfo = "Employee Record Has Been Deleted!! Redirecting..."
          setTimeout(() => {
            this._router.navigate(['/List']);
          }, 1500);
        },
        error: () => {
          this.closeDeleteModal();
          this.deleteErrorMessage = "Error Deleting Record , server Error";
        }
      });
    } else {
      this.closeDeleteModal();
    }

  }

  showDeleteModal() {
    this.deleteModalRef.nativeElement.show();
  }
  closeDeleteModal() {
    this.deleteModalRef.nativeElement.close();
  }

}
