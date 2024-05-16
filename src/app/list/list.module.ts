import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { RouterModule } from '@angular/router';
import { CheckAuthGuardService } from '../shared/service/check-auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    CreateEmployeeComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'List', component: EmployeeListComponent,canActivate:[CheckAuthGuardService] },
      { path: 'createEmployee', component: CreateEmployeeComponent,canActivate:[CheckAuthGuardService] },
      { path: 'Listdetail', component: EmployeeDetailComponent,canActivate:[CheckAuthGuardService] },
      
    ])
  ],
  providers:[CheckAuthGuardService]
})
export class FileListModule { }
