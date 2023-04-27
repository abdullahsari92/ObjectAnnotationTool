import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AsSettingsService } from 'src/app/services/as-settings.service';


@Component({
  selector: 'kt-img-viewer',
  templateUrl: './img-viewer.component.html'
})
export class ImgViewer implements ICellRendererAngularComp {
   params!: ICellRendererParams;
   imageUrl: string="";
   imageDisplay: boolean= false;
  constructor(
    public dokoSettings: AsSettingsService
  ) {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.imageUrl = params.value;
    if (this.imageUrl) {
      this.imageDisplay = true; 
    }
  }
  
  refresh() {
    return false;
  }
}
