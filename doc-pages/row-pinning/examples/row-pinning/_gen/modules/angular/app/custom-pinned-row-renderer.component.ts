import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'floating-cell',
  template: `<span [ngStyle]="style">{{ params.value }}</span>`,
})
export class CustomPinnedRowRenderer implements ICellRendererAngularComp {
  public params: any;
  public style!: string;

  agInit(params: any): void {
    this.params = params;
    this.style = this.params.style;
  }

  refresh(): boolean {
    return false;
  }
}
