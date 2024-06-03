import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { employeeObject, employeeResponse, empoloyeeListReq } from '../../../shared/models/employee.model';
import { FileManagementService } from '../../../shared/service/file-management.service';
import { Router } from '@angular/router';
import { Subscription, debounceTime, fromEvent } from 'rxjs';


@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.scss']
})
export class BatchListComponent implements OnInit, AfterViewInit, OnDestroy {

  public employeeListRequestBody: empoloyeeListReq = new empoloyeeListReq();
  public employeeResponse: employeeResponse = new employeeResponse();
  public totalCount: number = 0;

  public totalPages: number[] = [];
  public currentPage: number = 1;
  public pageSize: number = 15;
  public pageIndex: number = 0;

  public PageSizeValues: number[] = [10, 15, 30, 50, 100];
  public errorMessage: string[] = ["No Records Found!", "Error Connecting Server!"];
  public errorText: string = "";
  public isError: boolean = false;

  public employeeIdSearchText: string = "";
  public employeeNameSearchText: string = "";

  public allDepartmentOptions: string[] = [];
  public allBussinessUnitOptions: string[] = [];
  public allCountryOptions: string[] = [];
  public allCityOptions: string[] = [];
  public allGenderOptions: string[] = [];
  public allEthnicityOptions: string[] = [];

  public selectedDepartmentOption: string = "";
  public selectedBuOption: string = "";
  public selectedCountryOption: string = "";
  public selectedCityOption: string = "";
  public selectedGenderOption: string = "";
  public selectedEthnicityOption: string = "";

  public searchTextSub: Subscription = new Subscription();

  @ViewChild('nameSearchText', { static: false }) nameSearchTextEle: ElementRef = {} as ElementRef;

  @ViewChild('empIDSearchText', { static: false }) empIDSearchTextEle: ElementRef = {} as ElementRef;

  constructor(private _EmployeeService: FileManagementService, private _router: Router) { }
  ngOnDestroy(): void {
    if (this.searchTextSub) {
      this.searchTextSub.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.getEmployeeList();
    this.getAllOptions();
    this.subscribeToSearchTextEvents();
  }

  subscribeToSearchTextEvents() {
    this.searchTextSub = fromEvent(this.nameSearchTextEle.nativeElement, 'keyup').pipe(debounceTime(1200)).subscribe((element) => {
      if (element) {
        this.employeeListRequestBody.Full_Name = <string>(element as any).target.value;
        this.getEmployeeList();
      }

    });

    this.searchTextSub.add(
      fromEvent(this.empIDSearchTextEle.nativeElement, 'keyup').pipe(debounceTime(1200)).subscribe((element) => {
        if (element) {
          this.employeeListRequestBody.Employee_ID = <string>(element as any).target.value;
          this.getEmployeeList();
        }

      })
    );
  }

  public resetAllFeilds() {
    this.selectedDepartmentOption = "";
    this.selectedBuOption = "";
    this.selectedCountryOption = "";
    this.selectedCityOption = "";
    this.selectedGenderOption = "";
    this.selectedEthnicityOption = "";
    this.employeeNameSearchText = "";
    this.employeeIdSearchText = "";

    this.employeeListRequestBody = new empoloyeeListReq();
    this.pageSize = this.employeeListRequestBody.recordPerPage;
    this.getEmployeeList(true);
  }

  getEmployeeList(resetPagination: boolean = true) {
    this.isError = false;

    this.employeeListRequestBody.recordPerPage = this.pageSize;

    if (resetPagination) {
      this.pageIndex = 0;
      this.currentPage = 1;
      this.employeeListRequestBody.pageIndex = 0;
    }
    else {
      this.pageIndex = this.currentPage - 1;
      this.employeeListRequestBody.pageIndex = this.pageIndex < 0 ? 0 : this.pageIndex;
    }






    this._EmployeeService.getEmployeeList(this.employeeListRequestBody).subscribe({
      next: (data) => {
        this.employeeResponse = data;
        if (this.employeeResponse.empdata.length == 0) {
          this.isError = true;
          this.errorText = this.errorMessage[0];
          this.updatePagination(0);
        }
        else {
          this.totalCount = this.employeeResponse.totalCount[0].count;
          this.updatePagination(this.totalCount);

        }

      },
      error: (err) => {
        this.isError = true;
        this.errorText = this.errorMessage[1];
      }
    });
  }

  ngOnInit(): void {

  }

  //To split the records according to the pageSize and the totalCount of list records
  updatePagination(totalRecords: number = 0) {
    let totalPagesCount: number = 0;
    if (totalRecords == 0) {
      this.totalPages = [];
      this.currentPage = 1;
    }
    else {
      totalPagesCount = Math.ceil(
        totalRecords / this.pageSize
      );

      let pages: number[] = [];
      for (let i = 1; i <= totalPagesCount; i++) {
        pages.push(i);
      }
      this.totalPages = pages.map(page => page);

    }

  }

  pageForwardButton() {
    this.currentPage = this.currentPage + 1;
    this.getEmployeeList(false);

  }
  pageBackwardButton() {
    this.currentPage = this.currentPage - 1;
    this.getEmployeeList(false);

  }
  updatePage($event: number) {
    this.currentPage = $event;
    this.getEmployeeList(false);
  }

  updatePageSize($event: number) {
    this.pageSize = $event;
    this.getEmployeeList(false);
  }

  disableForwardButton() {

    if (this.currentPage == this.totalPages.length) {
      return true;
    }
    return false;
  }

  redirectToDetailPage(employee: employeeObject) {
    this._router.navigate(['/Listdetail'], { queryParams: { id: employee._id } });
  }

  public getAllOptions() {
    this._EmployeeService.getAllSearchOptions().subscribe({
      next: (data) => {
        let [
          departmentoptions,
          bussinessoptions,
          countryOptions,
          cityOptions,
          genderOptions,
          ethnicityOptions] = data;



        this.allDepartmentOptions = departmentoptions;
        this.allBussinessUnitOptions = bussinessoptions;
        this.allCountryOptions = countryOptions;
        this.allCityOptions = cityOptions;
        this.allGenderOptions = genderOptions;
        this.allEthnicityOptions = ethnicityOptions;


      },
      error: (err) => {
        console.log(err);
      }

    })
  }

  public onDepartmentSelect(department: string) {
    this.employeeListRequestBody.Department = department;
    this.getEmployeeList();
  }

  public onBussinessUnitSelect(bussinessUnit: string) {
    this.employeeListRequestBody.Business_Unit = bussinessUnit;
    this.getEmployeeList();
  }

  public onCountrySelect(country: string) {
    this.employeeListRequestBody.Country = country;
    this.getEmployeeList();
  }

  public onGenderSelect(gender: string) {
    this.employeeListRequestBody.Gender = gender;
    this.getEmployeeList();
  }

  public onEthnicitySelect(ethnicity: string) {
    this.employeeListRequestBody.Ethnicity = ethnicity;
    this.getEmployeeList();
  }

  public onCitySelect(city: string) {
    this.employeeListRequestBody.City = city;
    this.getEmployeeList();
  }

}
