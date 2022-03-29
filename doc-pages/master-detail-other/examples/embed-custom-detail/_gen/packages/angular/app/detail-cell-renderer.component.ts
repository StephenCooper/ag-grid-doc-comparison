import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: "app-detail-cell-renderer",
  template: `<h1 class="custom-detail" style="padding: 20px;">
    {{ pinned }}
  </h1>`,
})
export class DetailCellRenderer implements ICellRendererAngularComp {
  public pinned!: string;

  agInit(params: ICellRendererParams): void {
    this.pinned = params.pinned ? params.pinned : "center";
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
