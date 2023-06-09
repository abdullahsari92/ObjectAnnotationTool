import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AsSettingsService } from 'src/app/services/as-settings.service';


@Component({
  selector: 'oyss-file-viewer',
  templateUrl: './file-viewer.component.html'
})

export class FileViewerComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  fileUrl: string="";
  constructor(
    public dokoSettings: AsSettingsService
  ) { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.fileUrl = params.value;
    //console.log('  this.fileUrl ',  this.fileUrl)
  }

  refresh() {
    return false;
  }
  
}
