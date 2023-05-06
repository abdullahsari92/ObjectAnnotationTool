import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlContainer, FormGroupDirective, FormControl, FormGroup } from '@angular/forms';
import { ImgUploadComponent } from '../img-upload/img-upload.component';

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

	@Input() width: number = 300;
	@Input() height: number = 50;
	@Input() X: number =0;
	@Input() Y: number = 0;
	@Input() id: number = 0;


	@Output() cancel:EventEmitter<any> = new EventEmitter();
	



	public fileUploadQueue: any;
	constructor(private controlContainer: ControlContainer,
		private cdr: ChangeDetectorRef,

	) { }
  
  
  ngOnInit(): void {
   
  }


  close()
  {

	this.cancel.emit(this.id);
      
  }
}

