import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, Injector, OnInit, ReflectiveInjector, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { FileResult } from 'src/app/Model/fileResult';
import { InputComponent } from 'src/app/Partials/input/input.component';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'as-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})
export class DocumentAddComponent implements AfterViewInit, OnInit {

  data: any;
  documentForm!: FormGroup;
  isUpdate: boolean = false;

  resultFile: FileResult = new FileResult();
  listKutu:any[] =[];

  

  private isDrawing = false;
  private lastX: number =0;
  private lastY: number =0;

  private firstX: number =0;
  private firstY: number =0;

listCount =0;

  myInjector: Injector | undefined;
  constructor(private fb: FormBuilder,
    private sinifService: DocumentService,
    public asSettingsService: AsSettingsService,
    private router: Router,
    injector: Injector,
    private cdf:ChangeDetectorRef,
    private documentService:DocumentService

  ) {

 
    this.data = this.router.getCurrentNavigation()?.extras.state;

    let title = 'My dynamic title works!';
   // this.myInjector = ReflectiveInjector.resolveAndCreate([{ provide: "width", useValue: '400px' }]);
    this.myInjector =
    Injector.create({providers: [{provide: "width", useValue: { width: '490px' } ,deps: ["400px"]}], parent: injector});
  }


  ngAfterViewInit() {



  }

  ngOnInit(): void {




    this.initEtiketForm()
  }


  getBackground() {

    return "background-image:" + this.resultFile.file_url;

  }
  file(event: any) {

    this.resultFile = event;


  }
  initEtiketForm() {
    this.documentForm = this.fb.group({
      id: [0],
      name: [""],
      image: ["", Validators.compose([Validators.required])],
      kutu1: [""],

    });
    if (this.data.id) {

      this.isUpdate = true;
      this.documentForm.addControl("uid", new FormControl());
      const controls = this.documentForm.controls;

      Object.keys(controls).forEach(controlName => {
        controls[controlName].setValue(this.data[controlName])
      });


    }

  }




  save() {

    console.log('documentForm ',this.documentForm.value)
    if (this.documentForm.invalid) {
      return;
    }
    if (this.data?.id) {
      this.update();
    }
    else {
      this.add();
    }

  }
  add() {


    var model = this.documentForm.value;


    this.documentService.add(model).subscribe(res => {
      if (res) {

        alert("işlem başarılı")
      }
      else {

        alert("işlem hatalı!")

      }
    })
  }

  cancel(id:any)
  {
    if(id)
    {

        var kutu = this.listKutu.find(p=>p.id == id);
 
         const indexNumber = this.listKutu.indexOf(kutu);
       
           this.listKutu.splice(indexNumber, 1)
    }

  }
  kutuEkle(event:any)
  {
    this.isDrawing = true;

    this.firstX = event.offsetX;
    this.firstY = event.offsetY; 

    console.log(' kutuEle - firstX ', this.firstX )
 
    
  }
  contextmenu(event:any)
  {

    console.log('dbule.offsetX ',event.offsetX)

   // console.log('listCount',this.listCount)
     
           
     
    this.listCount = this.listKutu.length;
        
          var width = event.offsetX - this.firstX ;
          var height = event.offsetY - this.firstY ;
         
          console.log('  draw',event.offsetX)
       
       
              var yeniKutu = {
              id:this.listKutu.length+1,
              width:  width ,
              height: height,
              X:this.firstX ,
              Y:this.firstY
            }
    
          this.listKutu.push(yeniKutu);     
  
    

  }



  mouseUp(event:any)
  {


    console.log(' stopDrawing',event.offsetX)
    this.isDrawing = false;

  //this.cdf.markForCheck();
  }



  update() {
    this.sinifService.update(this.documentForm.value).subscribe(res => {
      if (res.result) {

        alert("işlem başarılı")

      }
      else {
        alert("işlem hatalı!")


      }
    })
  }



}
