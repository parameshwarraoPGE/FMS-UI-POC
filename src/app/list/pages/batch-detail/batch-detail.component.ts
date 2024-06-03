import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FileManagementService } from '../../../shared/service/file-management.service';
import { detailResponse, employeeObject } from '../../../shared/models/employee.model';
import { CreateBatchComponent } from '../../components/create-batch/create-batch.component';
import { UntypedFormBuilder } from '@angular/forms';


@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public isError: boolean = false;

  public deleteMessageInfo: string = "";
  public deleteErrorMessage: string = "";

  public enableEdit: boolean = false;

  public id: string = "";

  @ViewChild('createEmpRef', { static: false }) _createEmployeeRef: CreateBatchComponent = new CreateBatchComponent(this._FormBuilder,
    this._router,
    this._EmployeeService);

  @ViewChild('deleteModal', { static: false }) deleteModalRef: ElementRef<any> = {} as ElementRef;

  employeeDetail: detailResponse = new detailResponse();
  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _EmployeeService: FileManagementService,
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