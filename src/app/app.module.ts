import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileManagementService } from './shared/service/file-management.service';
import { LoadingInterceptor } from './shared/service/loading-interceptor.service';
import { TokenInterceptor } from './shared/service/token-interceptor.service';
import { FileListModule } from './list/list.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent           
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,  
    FileListModule,    
    AppRoutingModule       
  ],
  providers: [FileManagementService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
   },
   {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
 }],
  bootstrap: [AppComponent]
})
export class AppModule { }
