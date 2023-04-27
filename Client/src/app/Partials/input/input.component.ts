import { ChangeDetectorRef, Component, Input, OnInit, forwardRef } from '@angular/core';
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

	@Input() width: any = "300px";
	@Input() height: any = "100px";
	@Input() X: any =200;
	@Input() Y: any = 0;


	public fileUploadQueue: any;
	constructor(private controlContainer: ControlContainer,
		private cdr: ChangeDetectorRef,

	) { }
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

