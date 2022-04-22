import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'simple-component',
  template: `
    <span [style.backgroundColor]="color" style="padding: 2px">{{
      params.value
    }}</span>
  `,
})
export class SimpleCellRenderer implements ICellRendererAngularComp {
  public params!: ICellRendererParams;
  public color!: string;
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.color = this.params.node.group ? 'coral' : 'lightgreen';
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}
