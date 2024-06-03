import { NgModule} from '@angular/core';
import {Router, RouterModule,Routes} from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { BatchModule } from './list/batch.module';

const routes: Routes = [
{
    path:'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
},
{
    path:'batch',
    loadChildren: () => import('./list/batch.module').then((m) => BatchModule)
},
{ 
    path: '', 
    redirectTo: 'user', 
    pathMatch: 'full' 
},
{   
    path: '**', component: NotFoundComponent 
    
}   
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}