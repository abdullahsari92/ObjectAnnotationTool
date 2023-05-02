import { AfterViewInit, Component, ElementRef, HostListener, Inject, Injector, OnInit, ReflectiveInjector, ViewChild } from '@angular/core';
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
  @ViewChild('canvas') canvas: ElementRef | undefined;

  ctx: CanvasRenderingContext2D | undefined;
  myComponent = InputComponent;

  listKutu:any[] =[{
    width: '200px',
    height:'50px',
    X:'45px',
    Y:'56px'
  },
  {
    width: '200px',
    height:'50px',
    X:'45px',
    Y:'123px'
  }
]

   myInputs = {
    width: '430px',
    height:'430px',
    X:'45px',
    Y:'56px'

  };
  
  // Kalem özellikleri
  private penColor = 'black';
  private penWidth = 2;
  private isDrawing = false;
  private lastX: number | undefined;
  private lastY: number | undefined;
  myInjector: Injector | undefined;
  constructor(private fb: FormBuilder,
    private sinifService: DocumentService,
    public asSettingsService: AsSettingsService,
    private router: Router,
    injector: Injector

  ) {

 
    this.data = this.router.getCurrentNavigation()?.extras.state;

    let title = 'My dynamic title works!';
   // this.myInjector = ReflectiveInjector.resolveAndCreate([{ provide: "width", useValue: '400px' }]);
    this.myInjector =
    Injector.create({providers: [{provide: "width", useValue: { width: '490px' } ,deps: ["400px"]}], parent: injector});
  }


  ngAfterViewInit() {

    console.log('this.canvas?.nativeElement ', this.canvas?.nativeElement)

    this.ctx = this.canvas?.nativeElement.getContext('2d') ?? undefined;


    // Kutunun çizileceği koordinatları belirleyin
    const x = 40;
    const y = 50;
    const width = 100;
    const height = 75;
    // Kutuyu çizin
    if (this.ctx) {
      this.ctx.fillStyle = '#f00';
      this.ctx.fillRect(x, y, width, height);

    }

  }

  ngOnInit(): void {




    this.initEtiketForm()
  }


  getBackground() {

    return "background-image:" + this.resultFile.file_url;

  }
  file(event: any) {
    console.log(' event', event)

    this.resultFile = event;


    if (this.ctx)
      this.ctx.drawImage(this.resultFile.file_url, 0, 0)

  }
  initEtiketForm() {
    this.documentForm = this.fb.group({
      id: [0],
      name: ["", Validators.compose([Validators.required])],
      resim: ["", Validators.compose([Validators.required])],
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

    if (this.documentForm.invalid) {
      return;
    }
    if (this.data.id) {
      this.update();
    }
    else {
      this.add();
    }

  }
  add() {


    var model = this.documentForm.value;


    this.sinifService.add(model).subscribe(res => {
      if (res) {

        alert("işlem başarılı")
      }
      else {

        alert("işlem hatalı!")

      }
    })
  }

  kutuEkle(event:any)
  {

    this.lastX = event.offsetX;
    this.lastY = event.offsetY; 

    var yeniKutu = {
      width: '100px',
      height:'50px',
      X:this.lastX +'px',
      Y:this.lastY +'px'
    }
    this.listKutu.push(yeniKutu)
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





  // Kalem çizme işlemleri
  @HostListener('mousedown', ['$event'])
  startDrawing(event: MouseEvent) {
    this.isDrawing = true;
    this.lastX = event.offsetX;
    this.lastY = event.offsetY;

    const x = 40;
    const y = 50;
    const width = 100;
    const height = 25;
    // Kutuyu çizin
    if (this.ctx) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.lastX, this.lastY, width, height);

    }


 
    var html ='<as-input  controlName="kutu1" [width]="'+x+'" [X]="'+x+'" [X]="'+y+'"></as-input>';




  }

  @HostListener('mousemove', ['$event'])
  draw(event: MouseEvent) {

    if (!this.isDrawing) {
      return;
    }
    console.log('ctx ',this.ctx)

    this.ctx?.beginPath();
    this.ctx?.moveTo(this.lastX??90, this.lastY??90);
    this.ctx?.lineTo(event.offsetX, event.offsetY);
    // this.ctx?.strokeStyle = this.penColor;
    // this.ctx?.lineWidth = this.penWidth;
    this.ctx?.stroke();
    this.lastX = event.offsetX;
    this.lastY = event.offsetY;
  }

  @HostListener('mouseup')
  stopDrawing() {
    this.isDrawing = false;
  }



}
