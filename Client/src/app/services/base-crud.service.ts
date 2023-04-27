
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AsSettingsService } from './as-settings.service';
import { ListModel } from '../Model/list.model';
@Injectable({
  providedIn: 'root'
})
export abstract class BaseCrudService {

  constructor(
    protected asSettingsService: AsSettingsService,
    protected httpClient: HttpClient,
    @Inject(String) private endPoint: any
  ) { }

  getList(): Observable<ListModel> {
    return this.httpClient.post<ListModel>(this.asSettingsService.apiUrl + this.endPoint + "GetAll", null);
  }

  add(data: any): Observable<any> {
    return this.httpClient.post<any>(this.asSettingsService.apiUrl + this.endPoint + "add", data);
  }

  update(data: any): Observable<any> {
    return this.httpClient.post<any>(this.asSettingsService.apiUrl + this.endPoint + "update", data);
  }

  delete(id: string): Observable<any> {
    var body = { id: id }
    return this.httpClient.post<any>(this.asSettingsService.apiUrl + this.endPoint + 'delete', body);
  }
  filter(model:any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.asSettingsService.apiUrl + this.endPoint + 'Filter', model, { observe: 'response' });
  }

  detail(id: string): Observable<any> {
    return this.httpClient.get<any>(this.asSettingsService.apiUrl + this.endPoint + 'detail/' + id);
  }


}
