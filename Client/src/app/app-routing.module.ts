import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtiketComponent } from './Modules/etiket/etiket.component';
import { PrivateLayoutComponent } from './theme/layout/private-layout/private-layout.component';
import { SinifComponent } from './Modules/sinif/sinif.component';
import { DocumentComponent } from './Modules/document/document.component';

const routes: Routes = [

  {
    path: 'admin',
    component: PrivateLayoutComponent, children: [

      { path: '', component: EtiketComponent },

      { path: 'etiket', component: EtiketComponent },
      { path: 'sinif', component: SinifComponent },

      {
        path: 'document',
        loadChildren: () => import('./Modules/document/document.module').then(m => m.DocumentModule)
      },




    ]
  },

  {
    path: '',
    component: PrivateLayoutComponent, children: [

      { path: '', component: EtiketComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
