import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtiketComponent } from './Modules/etiket/etiket.component';
import { PartialsModule } from './Partials/partials.module';
import { AuthenticationInterceptor } from './authentication-interceptor';
import { ThemeModule } from './theme/theme.module';
import { MenuHorizontalService } from './core/services/menu-horizontal.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddComponent } from './Modules/etiket/add/add.component';
import { SinifComponent} from './Modules/sinif/sinif.component';
import { SinifAddComponent } from './Modules/sinif/add/sinif.add.component';
@NgModule({
  declarations: [
    AppComponent,
    EtiketComponent,
  AddComponent,
  SinifComponent,
  SinifAddComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PartialsModule,
    BrowserAnimationsModule,
    ThemeModule,
  ],
  providers: [
	  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
		MenuHorizontalService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
