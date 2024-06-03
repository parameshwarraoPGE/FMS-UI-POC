import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { BatchListComponent } from './pages/batch-list/batch-list.component';

import { CheckAuthGuardService } from '../shared/service/check-auth.service';
import { CreateBatchComponent } from './components/create-batch/create-batch.component';
import { BatchDetailComponent } from './pages/batch-detail/batch-detail.component';


const routes: Routes = [
    {
        path: 'list',
        component: BatchListComponent,
        canActivate: [CheckAuthGuardService]
    },
    {
        path: 'createBatch',
        component: CreateBatchComponent,
        canActivate: [CheckAuthGuardService]
    },
    {
        path: ':id',
        component: BatchDetailComponent,
        canActivate: [CheckAuthGuardService]
    },    
    {
        path: '', pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: '**', redirectTo: 'notFound'

    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BatchRoutingModule { }


/*
{
        path: 'batchDetail/:id', component: BatchDetailComponent,
        canActivate: [CheckAuthGuardService]
    },
    {
        path: 'createBatch', component: CreateBatchComponent,
        canActivate: [CheckAuthGuardService]
    },

*/