import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, NG_VALUE_ACCESSOR, FormGroupDirective } from '@angular/forms';
import { FileResult } from 'src/app/Model/fileResult';

@Component({
	selector: 'as-img-upload',
	templateUrl: './img-upload.component.html',
	styleUrls: ['./img-upload.component.css'],
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
export class ImgUploadComponent implements OnInit {
	public form!: FormGroup;
	public formControl!: FormControl;


	public fileUploadQueue: any;
	constructor(private controlContainer: ControlContainer,
		private cdr: ChangeDetectorRef,

	) { }

	@Input() controlName!: string;



	@Input() imgBase64: any;
	@Input() imgURL: any;
	@Input() subMessage!: string;

	@Input() multiple: boolean = true;

	resultFile: FileResult = new FileResult();
	@Output() file: EventEmitter<FileResult> = new EventEmitter();
	@Output() chance: EventEmitter<any> = new EventEmitter();

	@Input() isSaveButton: boolean = true;


	ngOnInit(): void {


		this.form = <FormGroup>this.controlContainer.control;
		this.formControl = <FormControl>this.form.get(this.controlName);

	}



	isFileControlHasError: boolean | undefined;
	uploadImage: any;


	onFileChance(imgFile: any) {

		if (imgFile) {


			const reader = new FileReader();

			 console.log('imgFile.target',imgFile.target.files)
			let file = imgFile.target.files[0];
			this.resultFile.file = file;

			if (!file.name.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)) {
				this.isFileControlHasError = true;
			}
			else {
				if (file.size > 10024 * 1024 * 1) {
					this.isFileControlHasError = true;
				} else {
					this.isFileControlHasError = false;
					reader.readAsDataURL(file);
					reader.onload = () => {

						this.imgBase64 = reader.result;
						this.imgURL = reader.result;

			      this.resultFile.file_url = reader.result;
						
						this.chance.emit(true);
						this.file.emit(this.resultFile);

						this.cdr.markForCheck();
						this.ChangeImg(file.type);

					};

				}
			}


		}


	}
	ChangeImg(type: any): void {

		
		setTimeout(() => {
			if (this.imgURL) {
				this.formControl.setValue(this.imgURL);
			}
			else {
				if (this.imgBase64)
					this.formControl.setValue(this.imgBase64);
			}
		}, 2500);
	}


	
	removeItem(i: any) {

		this.resultFile = new FileResult();
		this.formControl.setValue("");
		// console.log('imgUrlList ', this.resultFiles)
	}



	isControlHasError(controlName: string, validationType: string, form: FormGroup): boolean {

		const control = form.controls[controlName];
		if (!control) {
			return false;
		}
		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

}
