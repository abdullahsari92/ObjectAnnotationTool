import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { SınıfService } from 'src/app/services/sınıf.service';
import { SinifComponent } from '../sinif.component';

@Component({
  selector: 'as-sinif-add',
  templateUrl: './sinif.add.component.html',
  styleUrls: ['./sinif.add.component.scss']
})
export class SinifAddComponent  implements OnInit {

  etiketCardForm!: FormGroup;
  isUpdate: boolean = false;


  constructor(private fb: FormBuilder,
     private sinifService: SınıfService,    
    public asSettingsService:AsSettingsService,
    public dialogRef: MatDialogRef<SinifComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }



  ngOnInit(): void {
  

    this.initEtiketForm()
  }

  initEtiketForm() {
  	this.etiketCardForm = this.fb.group({
       id: [0],
      name: ["", Validators.compose([ Validators.required])], 
   
    

     

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

   
    this.sinifService.add(model).subscribe(res => {
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
    this.sinifService.update(this.etiketCardForm.value).subscribe(res => {
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


 
  


  }
 