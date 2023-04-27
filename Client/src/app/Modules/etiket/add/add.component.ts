import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EtiketComponent } from '../etiket.component';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { EtiketService } from 'src/app/services/etiket.service';
import { SınıfService } from 'src/app/services/sınıf.service';

@Component({
  selector: 'as-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  etiketCardForm!: FormGroup;
  isUpdate: boolean = false;


  constructor(private fb: FormBuilder,
     private etiketService: EtiketService,
     private sınıfService: SınıfService,

    
    public asSettingsService:AsSettingsService,
    public dialogRef: MatDialogRef<EtiketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }



  ngOnInit(): void {
  

    this.initEtiketForm()
  }

  initEtiketForm() {

    this.getSınıfList();
  	this.etiketCardForm = this.fb.group({
       id: [0],
      name: ["", Validators.compose([ Validators.required])], 
      description: ["",Validators.compose([Validators.required])],
      sinifId: [0],
      sinif: [],

     

     });
    if (this.data.id) {

      this.isUpdate = true;
      this.etiketCardForm.addControl("uid", new FormControl());
      const controls = this.etiketCardForm.controls;

      Object.keys(controls).forEach(controlName => {
        controls[controlName].setValue(this.data[controlName])
      });      


    }

  }

  save()
  {

    if(this.etiketCardForm.invalid)
    {
      return;
    }
    if(this.data.id)
    {
      this.update();
    }
    else
    {
      this.add();
    }

  }
  add() {
  

    var model  = this.etiketCardForm.value;

   
    this.etiketService.add(model).subscribe(res => {
      if (res) {
        this.dialogRef.close({
          data: res.data
        });
         alert("işlem başarılı")
      }
      else {
      
        alert("işlem hatalı!")

      } 
    })
  }

  update() {
    this.etiketService.update(this.etiketCardForm.value).subscribe(res => {
        if (res.result) {
          this.dialogRef.close({
            data: res.data
          });
          alert("işlem başarılı")

        }
        else {
          alert("işlem hatalı!")


        } 
    })
  }


  
  sinifList:any[] = [];
  getSınıfList()
  {
    this.sınıfService.getList().subscribe(res=>{

      console.log(' resss',res)
      if(res.items) {
        this.sinifList = res.items;     

      console.log(' sinifList',this.sinifList)

 
      }
    })
  }
  


  }
 