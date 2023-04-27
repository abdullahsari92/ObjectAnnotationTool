import { Component, OnInit } from '@angular/core';
import { EtiketService } from 'src/app/services/etiket.service';
import { AddComponent } from './add/add.component';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';

@Component({
  selector: 'AS-etiket',
  templateUrl: './etiket.component.html',
  styleUrls: ['./etiket.component.sass']
})
export class EtiketComponent implements OnInit {


  rowData:any;
  columnDefs:any;
  etiket:any;
  /**
   *
   */
  constructor(

     private etiketService:EtiketService,
     private dialog:MatDialog
  ) {
        
  }



  ngOnInit(): void {
    
    
    this.agGridInit();


  }



  getlist()
  {

    this.etiketService.getList().pipe( tap(res =>{     
      
      if(res)
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



    const dialogRef = this.dialog.open(AddComponent, { data,width:"40%",minWidth:"340px",maxHeight:"550px"});

    dialogRef.afterClosed().subscribe(refData => {

      if (!refData) {
        //burada modal kapanıyor

        return;
      }
      this.getlist();


    });
  }


    
  update()
  {

    var etiket:any = {};

    etiket.etiketname="mustafaKatman";
    etiket.FirstName="Nuri";
    etiket.LastName="katman";
    etiket.Password="xvdgd4";
    etiket.Email="katman@gmail.com";
    etiket.Id="2880d032-ee50-40aa-8dd8-5a91560722a6";

    this.etiketService.update(etiket).subscribe(res=>{

      console.log(' Guncellenen Etiket: ',res)

      if(res.result)

      {
        this.getlist();
      }
    })

  }
  

  agGridInit() {

    this.getlist();


    this.columnDefs = [
      { field: 'id', headerName: "id", sortable: true, filter: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, width: 70 },
      { field: 'name', headerName: "Etiket Adı", minWidth: 130 },
      { field: 'description', headerName: "Açıklama", minWidth: 130 },
      

      {
        field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent', cellEditorParams: {
          values: [{ text: 'UPDATE', icon: 'created' },],
        }
      },
    ];
  }


}
