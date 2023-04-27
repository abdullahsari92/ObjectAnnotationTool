import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SınıfService } from 'src/app/services/sınıf.service';
import { SinifAddComponent } from './add/sinif.add.component';
import { tap } from 'rxjs';

@Component({
  selector: 'as-sinif',
  templateUrl: './sinif.component.html',
  styleUrls: ['./sinif.component.scss']
})
export class SinifComponent {


  rowData:any;
  columnDefs:any;
  etiket:any;
  /**
   *
   */
  constructor(

     private sinifService:SınıfService,
     private dialog:MatDialog
  ) {
        
  }



  ngOnInit(): void {
    
    
    this.agGridInit();


  }


  getlist()
  {

    this.sinifService.getList().pipe( tap(res =>{     

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
  
  
  add(data:any = {})
  {



    const dialogRef = this.dialog.open(SinifAddComponent, { data,width:"40%",minWidth:"340px",maxHeight:"550px"});

    dialogRef.afterClosed().subscribe(refData => {

      if (!refData) {
        //burada modal kapanıyor
        return;
      }

      this.getlist();

    });
  }


    

  

  agGridInit() {

    this.getlist();


    this.columnDefs = [
      { field: 'id', headerName: "id", sortable: true, filter: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, width: 70 },
      { field: 'name', headerName: "Sınıf Adı", minWidth: 130 },
      { field: 'description', headerName: "Açıklama", minWidth: 130 },
      

      {
        field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent', cellEditorParams: {
          values: [{ text: 'UPDATE', icon: 'created' },],
        }
      },
    ];
  }


}
