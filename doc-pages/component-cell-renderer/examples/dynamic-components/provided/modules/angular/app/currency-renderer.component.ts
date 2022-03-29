import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ICellRendererParams } from "@ag-grid-community/core";
import { Component } from "@angular/core";

@Component({
  selector: "currency-cell",
  template: `{{ params.value | currency: "EUR" }}`,
})
export class CurrencyRenderer implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
