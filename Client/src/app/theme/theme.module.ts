
import { CommonModule, DatePipe } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { PrivateLayoutComponent } from './layout/private-layout/private-layout.component';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuComponent, PrivateLayoutComponent],
  imports: [
    CommonModule,   
   MaterialModule,
   RouterModule,
   HttpClientModule
  ],
  exports: [
    MenuComponent,
    MaterialModule,

  ],
  providers: [
     DatePipe
  ]

})
export class ThemeModule { }
