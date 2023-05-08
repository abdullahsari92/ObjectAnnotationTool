import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsSettingsService {

  private previousUrl: string = "";
  private currentUrl: string = "";


  apiUrl = environment.apiUrl;


siteUrl ="https://localhost:7031/"


  selectedStatus = { key: -1, value: '[Tümü]' };
  selectedPageSize = { key: 10, value: '10' };

  fileBaseUrl="https://apifairscope.cevizyazilim.com/v100/fpublic/get_file_thumb/";
  fileBaseUrlOrjinal="https://apifairscope.cevizyazilim.com/v100/fpublic/get_file/";

  statusOptions = [
    { key: -1, value: '[Tümü]' },
    { key: 1, value: 'Onaylı' },
    { key: 0, value: 'Onaysız' },
  ];

  statusLanguages = [
    { key: "Tr", value: 'tr' },
    { key:  "En", value: 'en' },
    { key:"Fr", value: 'fr' },
    { key:"De", value: 'de' },

  ];


  rowsPerPageOptions = [
    5,
    10,
    25,
    50,
    100,
    500,
    { showAll: '[Tümü]' }
  ];

  pageSizes = [
  //  { key: -1, value: 'Tümü' },
    { key: 5, value: '5' },
    { key: 10, value: '10' },
    { key: 25, value: '25' },
    { key: 50, value: '50' },
    { key: 100, value: '100' },
    { key: 500, value: '500' },
  ];

  constructor(
    private router: Router
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl(): string {
    return this.previousUrl;
  }

  
  isControlHasError(controlName: string, validationType: string,form:FormGroup): boolean {
		const control = form.controls[controlName];
		if (!control) {
			return false;
		}
		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}



}
