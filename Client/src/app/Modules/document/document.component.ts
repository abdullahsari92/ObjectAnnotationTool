import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { SinifAddComponent } from '../sinif/add/sinif.add.component';

@Component({
  selector: 'as-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {


  rowData:any;
  columnDefs:any;
  etiket:any;
  /**
   *
   */
  constructor(

     private documentService:DocumentService,
    
     private router: Router,
     private activatedRoute: ActivatedRoute,
  ) {
        
  }



  ngOnInit(): void {
    
    
    this.agGridInit();


  }


  getlist()
  {

    this.documentService.getList().pipe( tap(res =>{     

      if(res.items)
      {
           this.rowData = res.items;

           console.log('getList ',res)
      }
    }) ) .subscribe(res=>{
    
   
    },err =>{
      console.log(' errr',err)
    })
  }
  
  

  editData(data:any = {}) {


    this.router.navigate(['add'], { state: data, relativeTo: this.activatedRoute });

  }

    

  

  agGridInit() {

    this.getlist();


    this.columnDefs = [
      { field: 'id', headerName: "id", sortable: true, filter: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, width: 70 },
      { field: 'name', headerName: "Sınıf Adı", minWidth: 130 },
      { field: 'path', headerName: "Resim Url", minWidth: 130 },
      

      {
        field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent', cellEditorParams: {
          values: [{ text: 'UPDATE', icon: 'created' ,action: 'create' },],
        }
      },
    ];
  }


  detay(data:any)
  {
console.log('detay ',data)
    this.router.navigate(['../add'], { state: data, relativeTo: this.activatedRoute });

  }

}
