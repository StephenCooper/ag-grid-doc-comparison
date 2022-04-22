import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'simple-component',
  template: `<img
    alt="{{ params.data.country }}"
    src="{{
      params.context.base64flags[
        params.context.countryCodes[params.data.country]
      ]
    }}"
  />`,
})
export class CountryCellRenderer implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh() {
    return false;
  }
}
