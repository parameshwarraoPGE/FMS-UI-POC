import { NgModule} from '@angular/core';
import {Router, RouterModule,Routes} from '@angular/router';
import { NotFoundComponent } from '../core/components/not-found/not-found.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';


const routes: Routes = [
{ 
    path: "",   
    component: UserPageComponent,    
    children:[
        { 
            path: 'login', component: LoginComponent
        },
        { 
            path: 'sign-up', component: SignupComponent 
        },
        { 
            path: 'pwd-reset', component: PasswordResetComponent 
        },
        { 
            path: '', pathMatch:'full',
            redirectTo: 'login'
        }
    ]    
},
{   
    path: '**', redirectTo: 'notFound'
    
}   
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule{}