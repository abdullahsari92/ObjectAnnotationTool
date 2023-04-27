import { Injectable } from '@angular/core';
//import { loginModel } from '../models/loginModel';



@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {

  }

  //loginModel: loginModel;
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify({ objectName: value }));
  }


  getItem(key: any): any {
   
    var deger = localStorage.getItem(key);
    if(deger)
    {

      const items = JSON.parse(deger);
      return items == null ? null : items.objectName;

    }
  }


  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  getObjectItems(fullPath:string):any
  {
    let path = fullPath.split(".")[0];
    let arrayName = fullPath.split(".")[1];

    var anaDizi:any[] = this.getItem(path);

    if(anaDizi)       
      return anaDizi[parseInt(arrayName)];
   
    
  }

}
