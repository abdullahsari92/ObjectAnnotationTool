import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AsSettingsService } from './as-settings.service';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class SınıfService extends BaseCrudService {

  
  constructor(
    protected dokoSettingsService: AsSettingsService,
    protected http: HttpClient,  
  ) {
    super(dokoSettingsService, http, 'Sinif/');

  }

  



}
