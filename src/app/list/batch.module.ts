import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchListComponent } from './pages/batch-list/batch-list.component';
import { CheckAuthGuardService } from '../shared/service/check-auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BatchRoutingModule } from './batch-routing.module';
import { BatchDetailComponent } from './pages/batch-detail/batch-detail.component';
import { CreateBatchComponent } from './components/create-batch/create-batch.component';




@NgModule({
  declarations: [
    BatchListComponent,
    BatchDetailComponent,
    CreateBatchComponent   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BatchRoutingModule
  ],
  providers:[CheckAuthGuardService]
})
export class BatchModule { }
