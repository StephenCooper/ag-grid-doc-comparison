import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'params-cell',
  template: `Field: {{ params.colDef.field }}, Value: {{ params.value }}`,
})
export class ParamsRenderer implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
