import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlContainer, FormGroupDirective, FormControl, FormGroup } from '@angular/forms';
import { ImgUploadComponent } from '../img-upload/img-upload.component';
import { EtiketKutu } from 'src/app/Model/etiketKutu';

@Component({
  selector: 'as-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => ImgUploadComponent),
		multi: true
	}],
	viewProviders: [
		{
			provide: ControlContainer,
			useExisting: FormGroupDirective
		}
	]
})
export class InputComponent implements OnInit {
	public form!: FormGroup;
	public formControl!: FormControl;


	@Input() etiketKutu: EtiketKutu =  {

        width: 300,
        height:  50,
        X: 0,
        Y: 0,
        id:0,
		value:''
	}

	@Input() width: number = 300;
	@Input() height: number = 50;
	@Input() X: number =0;
	@Input() Y: number = 0;
	@Input() id: number = 0;


	@Output() cancel:EventEmitter<any> = new EventEmitter();

	@Output() edit:EventEmitter<any> = new EventEmitter();

	



	public fileUploadQueue: any;
	constructor(private controlContainer: ControlContainer,
		private cdr: ChangeDetectorRef,

	) { }
  
  
  ngOnInit(): void {
   
  }


  setValue(event:any)
  {

	this.edit.emit(event.target.value);
  }
  close()
  {

	this.cancel.emit(this.id);
      
  }
}

