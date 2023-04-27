import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuSubjectService {

  private menuOpenSubject = new BehaviorSubject<any>([]);



  currentMenu = this.menuOpenSubject.asObservable();


  constructor() { }

  menuDegistir(menu: any) {

    this.menuOpenSubject.next(menu);
  }

 


}
