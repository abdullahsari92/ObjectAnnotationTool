import { AfterViewInit, ChangeDetectorRef, Component,Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { EtiketKutu } from 'src/app/Model/etiketKutu';
import { FileResult } from 'src/app/Model/fileResult';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { DocumentService } from 'src/app/services/document.service';
import { tap } from 'rxjs/operators';
import { EtiketService } from 'src/app/services/etiket.service';

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
  listKutu:EtiketKutu[] =[];

  

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
    private documentService:DocumentService,
    private etiketService:EtiketService

  ) {

 
    this.data = this.router.getCurrentNavigation()?.extras.state;
console.log('   this.data ',  this.data )
    let title = 'My dynamic title works!';
   // this.myInjector = ReflectiveInjector.resolveAndCreate([{ provide: "width", useValue: '400px' }]);
    this.myInjector =
    Injector.create({providers: [{provide: "width", useValue: { width: '490px' } ,deps: ["400px"]}], parent: injector});
  }


  ngAfterViewInit() {



  }

  ngOnInit(): void {

    this.initEtiketForm();
    this.getETiketlist();


  }


  getBackground() {

    return "background-image:" + this.resultFile.file_url;

  }
  file(event: any) {

    this.resultFile = event;
console.log('  this.resultFile ', this.resultFile )

    if(this.documentForm)
    {
      this.documentForm.get("file")?.setValue(this.resultFile.file);

    }

  }
  initEtiketForm() {


    this.documentForm = this.fb.group({
      id: [0],
      name: [],
      ImageBase64: ["", Validators.compose([Validators.required])],
      kutu1: [""],
      file: [],


    });
    if (this.data.id) {

      this.isUpdate = true;
      this.documentForm.addControl("uid", new FormControl());
      const controls = this.documentForm.controls;

      Object.keys(controls).forEach(controlName => {
        controls[controlName].setValue(this.data[controlName])
      });


      console.log(' JSON.parse( this.data.keyword) ', JSON.parse( this.data.keyword))
      this.listKutu =  JSON.parse( this.data.keyword).listKutu;
      

    }

  }


  etiketList:any[] =[];
  getETiketlist()
  {

    this.etiketService.getList().pipe( tap(res =>{     
      
      if(res)
      {
           this.etiketList = res.items;

           
      }
    }) ) .subscribe(res=>{    
   
    },err =>{
      console.log(' errr',err)
    })
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

    var listKutu = this.listKutu;
    model.keyword = JSON.stringify({ listKutu})

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

        var kutu = this.listKutu.find(p=>p.id == id) ?? new EtiketKutu();
 
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
       
       
              var yeniKutu:EtiketKutu = {
              id:this.listKutu.length+1,
              width:  width ,
              height: height,
              X:this.firstX ,
              Y:this.firstY,
              value:''
            }
    
          this.listKutu.push(yeniKutu);     
  
    

  }

  setValue(value:any,id:any)
  {

    console.log('event ',value)
   var yeniItem =  this.listKutu.find(p=>p.id==id) ?? new EtiketKutu();
  let index = this.listKutu.indexOf(yeniItem);

   yeniItem.value = value; 


  this.listKutu[index] =yeniItem;


  console.log(' listKutu',this.listKutu)
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
