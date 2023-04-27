import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentAddComponent } from './document-add/document-add.component';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartialsModule } from 'src/app/Partials/partials.module';
import { ThemeModule } from 'src/app/theme/theme.module';


const routes: Routes = [


  {
    path: '', component: DocumentComponent
  },

  {
    path: 'list', component: DocumentComponent
  },

  {
    path: 'add', component: DocumentAddComponent
  },




];

@NgModule({
  declarations: [DocumentComponent,DocumentAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    PartialsModule,
    ThemeModule,

  ],
  exports: [
		RouterModule
	]
})
export class DocumentModule { }
