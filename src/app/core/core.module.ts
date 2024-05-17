import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

export const COMMON_MODULE_IMPORT = [
    CommonModule
  ];
  
  
  export const COMMON_MODULE_DIRECTIVES = [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent 
  ];
  
  
  @NgModule({
    declarations: COMMON_MODULE_DIRECTIVES,
    imports: COMMON_MODULE_IMPORT,
    exports: COMMON_MODULE_DIRECTIVES
  })
  export class CoreModule { }